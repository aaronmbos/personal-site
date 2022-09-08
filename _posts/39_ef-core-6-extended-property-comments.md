---
id: 39
slug: ef-core-6-extended-property-comments
title: "Scaffolding XML Comments with Extended Properties in EF Core 6"
description: SQL Server has a feature called extended properties which can be used to add metadata to databases, schemas, tables, and columns. In this post, we are going to see how to use the extended property metadata to automatically generate corresponding XML comments on our scaffolded entities in EF Core 6.
publishedAt: 2022-05-28T12:07:29.154Z
updatedAt: 2022-05-28T12:12:58.850Z
metadata: dev,dotnet,efcore,sql,csharp
---
## Database Setup

This post is going to focus on a specific feature available in EF Core 6 database first development. The examples are going to be referring to the Adventure Works (2019) database, which can be found [here](https://docs.microsoft.com/en-us/sql/samples/adventureworks-install-configure?view=sql-server-ver16&tabs=ssms). First, let's take a look at extended properties and how we can view them on our database objects.

The AdventureWorks2019 database is very well documented with metadata on almost all tables, but for this post, we'll be looking at the `HumanResources.Employee` table and specifically the extended data related to the columns of the `Employee` table. In order to see the existing metadata for the columns in `HumanResources.Employee`, we can use the following query.

```sql
SELECT ext.major_id, c.name as [Column Name], ext.[value], ext.name as [Extended Property Name]
FROM sys.extended_properties ext
    JOIN sys.columns c ON ext.minor_id = c.column_id AND c.object_id = ext.major_id
WHERE ext.major_id = OBJECT_ID(N'HumanResources.Employee')
    AND class = 1;
```

![employee-ext-prop.png](https://res.cloudinary.com/aaron-bos/image/upload/v1653699215/employee_ext_prop_569d7fe4d5.png)

As you can see from the results grid in the screenshot above each column has an extended property that includes both a name and a value. The name of the extended property is important for EF Core to recognize during the scaffolding process, so it must be set to `MS_Description`. In this case, the extended properties were already created for the columns in the `Employee` table, but let's pretend for a moment that they weren't. How would we go about adding an extended property so that it could be consumed by EF Core scaffolding tools? To do this we need to use `sp_addextendedproperty` which is a stored procedure that will add extended properties to the database object specified in the arguments. Here is an example using the `MaritalStatus` column.

```sql
EXEC sp_addextendedproperty
  @name = N'MS_Description',
  @value = 'M = Married, S = Single, C = It''s Complicated',
  @level0type = N'Schema', @level0name = 'HumanResources',
  @level1type = N'Table',  @level1name = 'Employee',
  @level2type = N'Column', @level2name = 'MaritalStatus';
```

The snippet above will add an extended property to the `MaritalStatus` column with a name of `MS_Description` and a value of `M = Married, S = Single, C = It''s Complicated`. If you'd like to learn more about `sp_addextendedproperty` check out the full documentation [here](https://docs.microsoft.com/en-us/sql/relational-databases/system-stored-procedures/sp-addextendedproperty-transact-sql?view=sql-server-ver16). With the extended properties in place, we can now look at what needs to be done to actually scaffold the EF Core entity.

## Entity Scaffolding

When using the database first approach with EF Core 6, the scaffolding tool is a must-have in my opinion. The scaffolding tool handles a great deal of the boilerplate code and also conforms to EF best practices in terms of configuring database contexts and entities. Let's touch on the prerequisites for scaffolding.

First, we'll install the `dotnet-ef` as a global tool with `dotnet tool install --global dotnet-ef`. This installs the `dotnet-ef` tool globally and makes it available to use from anywhere on the host machine. Next, we'll be going into an existing project and the only requirement for that project is to have the `Microsoft.EntityFrameworkCore.Design` package installed. At this point, we are ready to run the scaffolding command for the `Employee` table. For the purpose of this post, I won't go too deep into the scaffold command options. If you'd like to learn more, check out the documentation [here](https://docs.microsoft.com/en-us/ef/core/cli/dotnet#dotnet-ef-dbcontext-scaffold).

```shell
dotnet ef dbcontext scaffold "CONNECTION_STRING" Microsoft.EntityFrameworkCore.SqlServer -o Models -t Employee --context-dir Context -c AdventureWorksContext
```

This will result in the `Employee` entity being created in the `Models` directory. If we look at the entity, we will see that all of the extended properties on columns or tables with the name `MS_Description` result in XML doc comments corresponding to the respective class or property.

![employee-ext-prop-comments.png](https://res.cloudinary.com/aaron-bos/image/upload/v1653699215/employee_ext_prop_comments_cc5a29d2cf.png)

I find this feature to be really useful for storing metadata on the database objects, but still being able to keep that information available when interfacing with the database through entity framework. As long as the comments provide value at the database level, I think they will provide equal value when included in the corresponding entity.
