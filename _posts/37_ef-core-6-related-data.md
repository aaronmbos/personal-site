---
id: 37
slug: ef-core-6-related-data
title: "Working with Related Data in EF Core 6"
description: I think that one of the most convenient features of ORMs like Entity Framework is the ability to reference related data via properties on an object or entity. In this post, we'll be looking at a few different ways to load related data in EF Core 6.

publishedAt: 2022-05-12T04:02:04.536Z
updatedAt: 2022-05-12T04:08:44.679Z
metadata: csharp,dotnet,efcore,database
---
## What is "Related Data"?

In this post, we will be working with the classic `AdventureWorks` database, specifically the `Employee` table. I chose this table because it has a handful of navigation properties that will be useful for demonstrating several points throughout the post. There are several properties on the `Employee` entity, but here is a quick snippet of the ones that we'll be mostly concerned with.

```csharp
public partial class Employee
{
    public Employee()
    {
        EmployeeDepartmentHistories = new HashSet<EmployeeDepartmentHistory>();
        EmployeePayHistories = new HashSet<EmployeePayHistory>();
        JobCandidates = new HashSet<JobCandidate>();
        PurchaseOrderHeaders = new HashSet<PurchaseOrderHeader>();
    }

    public virtual Person? BusinessEntity { get; set; }
    public virtual SalesPerson? SalesPerson { get; set; }
    public virtual ICollection<EmployeeDepartmentHistory> EmployeeDepartmentHistories { get; set; }
    public virtual ICollection<EmployeePayHistory> EmployeePayHistories { get; set; }
    public virtual ICollection<JobCandidate> JobCandidates { get; set; }
    public virtual ICollection<PurchaseOrderHeader> PurchaseOrderHeaders { get; set; }
}
```

All of the properties above are what would be considered "navigation properties". In the `Employee` class we have two kinds of navigation properties.

1. **Reference Navigation Property**: Holds a reference to a **single** related entity. Examples of this are `BusinessEntity` and `SalesPerson`.
1. **Collection Navigation Property**: Holds a reference to **many** related entities. Examples of this are the properties on `Employee` of type `ICollection<T>`.

Navigation properties are typically the result of Primary Key or Foreign Key relationships with other tables. For example, the `SalesPerson`, `EmployeeDepartmentHistories`, `EmployeePayHistories`, `JobCandidates`, and `PurchaseOrderHeaders` properties are mapped to the following Foreign Keys.

![related-data-foreign-keys.png](https://res.cloudinary.com/aaron-bos/image/upload/v1652326853/related_data_foreign_keys_8460c24622.png)

Now that we have a grasp on what related data is let's take a look at how we actually query that data starting with Eager Loading.

## Eager Loading

In my opinion, eager loading is the most common form of loading related data in EF Core. You'll notice that when you make a query the navigation properties are <u>not</u> included in the resulting entity by default (unless the data has already been loaded into the context from a previous query). This is sensible behavior because in most cases we should only retrieve necessary data and all the navigation properties do not necessarily need to be populated for each query.

We are going to be using a little console application with demo code. In this example, both `Console.WriteLine` statements will write `true` to the console.

```csharp
using EFRelatedData.Context;
using Microsoft.EntityFrameworkCore;

using (var db = new AdventureWorksContext()) {
    var emp = await db.Employees.FirstAsync(e => e.BusinessEntityId == 274);

    Console.WriteLine(emp.BusinessEntity == null);
    Console.WriteLine(emp.SalesPerson == null);
}
```

So, how can **eager loading** help us populate the navigation properties with data? The answer is the `Include` method. There are two overloads for the `Include` method which accept a lambda expression or a string to specify the navigation property to include. I would recommend using the lambda overload as it provides a bit more compile-time safety instead of a string literal.

If we want to include the `BusinessEntity` and `SalesPerson` navigation properties from our previous example it may look something like this.

```csharp
using (var db = new AdventureWorksContext()) {
    var emp = await db.Employees
        .Include(e => e.BusinessEntity)
        .Include(e => e.SalesPerson)
        .FirstAsync(e => e.BusinessEntityId == 274);

    Console.WriteLine(emp.BusinessEntity == null);
    Console.WriteLine(emp.SalesPerson == null);
}
```

How EF Core translates LINQ queries to SQL may differ from situation to situation, but typically including navigation properties results in some form of a join. For example, the query above results in the following SQL.

```SQL
SELECT TOP(1) [e].[BusinessEntityID], [e].[BirthDate], [e].[CurrentFlag], [e].[Gender], [e].[HireDate], [e].[JobTitle], [e].[LoginID], [e].[MaritalStatus], [e].[ModifiedDate], [e].[NationalIDNumber], [e].[OrganizationLevel], [e].[rowguid], [e].[SalariedFlag], [e].[SickLeaveHours], [e].[VacationHours], [p].[BusinessEntityID], [p].[AdditionalContactInfo], [p].[Demographics], [p].[EmailPromotion], [p].[FirstName], [p].[LastName], [p].[MiddleName], [p].[ModifiedDate], [p].[NameStyle], [p].[PersonType], [p].[rowguid], [p].[Suffix], [p].[Title], [s].[BusinessEntityID], [s].[Bonus], [s].[CommissionPct], [s].[ModifiedDate], [s].[rowguid], [s].[SalesLastYear], [s].[SalesQuota], [s].[SalesYTD], [s].[TerritoryID]
FROM [HumanResources].[Employee] AS [e]
  INNER JOIN [Person].[Person] AS [p] ON [e].[BusinessEntityID] = [p].[BusinessEntityID]
  LEFT JOIN [Sales].[SalesPerson] AS [s] ON [e].[BusinessEntityID] = [s].[BusinessEntityID]
WHERE [e].[BusinessEntityID] = 274
```

Now we know how to eagerly load navigation properties via the `Include` method, but what if we want to include a nested navigation property like `Employee.SalesPerson.SalesOrderHeaders`? This is where the `ThenInclude` method comes into play. In the event that we need to load a navigation property one level deeper than the property specified in the `Include` method we can use `ThenInclude` which has the same overloads as `Include`. 

Let's build on our previous example by using `ThenInclude` to include the `SalesOrderHeaders` property on the `Employee.SalesPerson` navigation property. Another feature that I'll add to this example is the ability to filter within `Include` and `ThenInclude` which was added in EF Core 5.0.

```csharp
using (var db = new AdventureWorksContext()) {
    var emp = await db.Employees
        .Include(e => e.BusinessEntity)
        .Include(e => e.SalesPerson)
        .ThenInclude(sp => sp.SalesOrderHeaders
            .Where(soh => soh.DueDate < DateTime.UtcNow))
        .FirstAsync(e => e.BusinessEntityId == 274);

    Console.WriteLine(emp.SalesPerson.SalesOrderHeaders.Count);
}
```

Before moving on I'd like to call out one of the potential downsides of eagerly loading related data. Eager loading results in fewer database requests and often times it may be assumed that fewer database requests equal, better performance. Unfortunately that is not _always_ the case. Loading several properties eagerly can lead to what is known as a "cartesian explosion", which is most common when the navigation properties being loaded have one:many relationships with the parent entity. I would always recommend inspecting the queries that EF Core is sending to the database before deciding on a query strategy. Next, we're going to look at **explicit loading**.

## Explicit Loading

Eager loading's goal is to get all the possible data without requiring any additional database requests. Sometimes we may not want to get ALL the related data or we may need to load related data based on a condition known after an initial query has been made. In these situations **explicit loading** is a great option. With explicit loading, we are able to use an already loaded entity to load related data separately, which results in separate queries to the database. While this may not be the go-to strategy for loading data, it can come in handy when problems like cartesian explosions pop up. With explicit loading we use `DbContext.Entry()` along with methods like `Reference()` for reference navigation properties or `Collection()` for collection navigation properties to specify which property needs to be loaded. Let's take a look at a couple of examples.

```csharp
using (var db = new AdventureWorksContext()) {
    var emp = await db.Employees
        .FirstAsync(e => e.BusinessEntityId == 274);

    await db.Entry(emp)
        .Reference(e => e.BusinessEntity)
        .LoadAsync();

    await db.Entry(emp)
        .Collection(e => e.EmployeePayHistories)
        .LoadAsync();
}
```

The example above will result in three separate queries to the database. The first to load the `emp` variable, the second to load the related `BusinessEntity` property, and the third to load `EmployeePayHistories`. We can also do things like filter and aggregate data to load explicitly using the `Query` method after calling `Reference` or `Collection`. One of the cool things about aggregating the explicitly loaded data is that it won't be pulled into memory to perform the aggregation. Let's see this in action.

```csharp
using (var db = new AdventureWorksContext()) {
    var emp = await db.Employees
        .FirstAsync(e => e.BusinessEntityId == 274);

    var count = await db.Entry(emp)
        .Collection(e => e.EmployeePayHistories)
        .Query()
        .CountAsync();
}
```

In this example, we replace `LoadAsync` with a call to `CountAsync` which results in the following query being made to the database.

```SQL
SELECT COUNT(*)
FROM [HumanResources].[EmployeePayHistory] AS [e]
WHERE [e].[BusinessEntityID] = 274
```

Next, we are going to look at **split queries** which are similar to explicit loading, but function slightly different therefore being useful in different situations.

## Split Queries

Explicit loading was a useful way to decouple an initial query from separate queries to load related data. There may be times when we don't need to have that separation, but would still like to request related data in separate queries. For these situations, we are able to use **split queries**. Split queries were introduced in EF Core 5.0 and could only be used alongside the `Include` method. In EF Core 6.0 we now have the ability to use split queries with projections as well as with the `Include` method. Let's take a look at examples for both scenarios.

```csharp
// Split query with Include()
using (var db = new AdventureWorksContext()) {
    var emp = await db.Employees
        .Include(e => e.EmployeePayHistories)
        .AsSplitQuery()
        .FirstAsync(e => e.BusinessEntityId == 274);
}

// Split query with a projection
using (var db = new AdventureWorksContext()) {
    var emp = await db.Employees
        .Select(e => new {Id = e.BusinessEntityId, PayHistories = e.EmployeePayHistories})
        .AsSplitQuery()
        .FirstAsync(e => e.Id == 274);
}
```

If we inspect the queries that EF generates for both split queries (with Include and Projection) the result is the same.

![explicit-loading-query.png](https://res.cloudinary.com/aaron-bos/image/upload/v1652326854/explicit_loading_query_ad7d1903e3.png)

Split queries are especially useful for situations where cartesian explosion becomes a performance issue and we have no need to decouple the parent entity from requesting the children. Finally, we will take a look at the ever-controversial **lazy loading**.

## Lazy Loading

I specifically added lazy loading last because it is personally my least favorite method of loading related data. While I think the concept behind lazy loading is admirable, the potential risk of misusing the functionality outweighs the benefits provided (in my current opinion..I'd be open to hearing counterarguments). If you're unfamiliar with lazy loading, it is essentially the ability to request related data just in time, as opposed to loading eagerly.

When using lazy loading, you don't need to do anything extra to request the related data. The extra database requests are made implicitly, which is where the downsides come in. Lazy loading can incur what is known as the "N+1 problem", which means that we'll have the initial query for the parent entity and `N` number of additional queries to load the related data.

Fortunately, lazy loading requires some additional configuration, which is beneficial in making sure that we are only using lazy loading when intended. In the following example, you'll notice that we have to add a reference to the `Microsoft.EntityFrameworkCore.Proxies` NuGet package and also add some options to the `DbContext` constructor in order to enable lazy loading.

```csharp
using (var db = new AdventureWorksContext(
            new DbContextOptionsBuilder<AdventureWorksContext>()
                .UseLazyLoadingProxies().Options))
{
    var emp = await db.Employees
        .FirstAsync(e => e.BusinessEntityId == 274);

    foreach (var header in emp.SalesPerson.SalesOrderHeaders)
    {
        Console.WriteLine(header.TotalDue);
    }
}
```

You might be surprised to see that the snippet above actually results in three separate queries to the database. I've personally seen situations where lazy loading has caused serious issues for applications that unknowingly misused the functionality.

At this point, we should have a comprehensive view of loading related data with EF Core 6.0. My hope is that this post demonstrates that there is not a "best" way to load related data, but more so that we need to think critically to determine the best method in a given situation. In our world, the answer is often "it depends" and that is no different here.
