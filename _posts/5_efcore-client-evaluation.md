---
id: 5
slug: efcore-client-evaluation
title: "EF Core and Client Evaluation"
description: Entity Framework Core is an amazing tool for interacting with databases of all kinds, but it doesn't come without potential pitfalls that can impact performance if you're not careful.
publishedAt: 2021-03-08T03:45:27.039Z
updatedAt: 2021-03-08T03:51:36.067Z
metadata: dev,database,dotnet,efcore
---
*This post will assume some familiarity with Entity Framework, but if you've worked with other Object Relational Mappers the concepts discussed may not be foreign to you.*

### What is Entity Framework Core?
Let's start off with a high-level overview of Entity Framework Core (we'll refer to it as **EF Core** from now on) and its place in the .NET development ecosystem. EF Core is the popular ORM (Object Relational Mapper) that is maintained by Microsoft. It provides a way for applications to interact with databases using strongly typed objects to represent the data as entities. Microsoft has great documentation so if you aren't familiar with EF Core, I would definitely head over [there](https://docs.microsoft.com/en-us/ef/core/) to learn even more! With a solid understanding of EF Core fundamentals, we can think a little deeper about our queries and how they will be evaluated by EF Core and the database provider.

### EF Core Query Evaluation
EF Core provides great functionality to interact with the database using LINQ. We are able to use LINQ statements with our EF Core entities just like we are able to use them on objects in memory. The only difference being that EF Core LINQ statements eventually need to get translated to SQL (or whatever query language your data provider uses) and executed against the database. A simple EF Core query using LINQ might look like this:

```
class Program
{
    static async Task Main(string[] args)
    {
        var cancelToken = new CancellationTokenSource().Token;
        using (var marvelContext = new MarvelContext())
        {
            // Simple LINQ query
            (await marvelContext.Characters.Where(x => !x.IsEvil)
                .Select(x => x.HeroName)
                .ToListAsync(cancelToken))
                .ForEach(x => Console.WriteLine(x));
        }  
    }
}
```
Thinking about that LINQ query in terms of a SQL query, it may get translated to something like this when evaluated (*this is actually the query that was generated*):

```
SELECT c.HeroName
FROM Characters AS c
WHERE NOT (c.IsEvil);
```
The output:

```
Iron Man
Captain America
Scarlet Witch
```

This simple example helps think about that translation from EF Core to SQL. When thinking about this process we want to be mindful of what EF Core and the database provider can actually translate and execute in the database versus what it can not. This is where **client and server evaluation** come into play.

### Client and Server Query Evaluation
The goal for EF Core queries is to have them be evaluated on the server (aka the database). Having a good understanding of how our LINQ queries may be translated and executed against the database will result in more reliable, consistent and performant functionality.

Client evaluation comes into play when an EF Core query can't be entirely evaluated in the database. You might be wondering *"What causes a query to be evaluated on the client?"*. Let's look at a couple of scenarios that could cause this to happen.

The first one we'll look at is when the client evaluation takes place in the top-level `.Select()` projection. This type of client evaluation is less harmful than others because the required data is retrieved from the database and only the transformation takes place on the client. 

In this situation, we'll define a static method that accepts our `Character` entity as an argument and returns a `string`. This method will be applied in our top-level `.Select()` and since the database has no way to translate this method into SQL it will be evaluated on the client.

```
private static string GetNameAndAlias(Character marvelCharacter) => $"{marvelCharacter.Name}: {marvelCharacter.HeroName}";
static async Task Main(string[] args)
{
    var cancelToken = new CancellationTokenSource().Token;
    using (var marvelContext = new MarvelContext())
    {
        (await marvelContext.Characters.Where(x => !x.IsEvil)
             .Select(x => GetNameAndAlias(x))
             .ToListAsync(cancelToken))
             .ForEach(x => Console.WriteLine(x));
    }  
}
```

The extent to which client evaluation is supported depends on which version of EF Core you are using.

- EF Core 3.0+ only supports partial client evaluation when the client evaluates the top level `.Select()` projection
- Prior to EF Core 3.0 client evaluation is fully supported, but warnings are logged when it occurs

This difference can make migrating from EF Core 2.x to EF Core 3+ a little more challenging if your queries have been relying on client evaluation. Let's look at an example to see how client evaluation is handled in EF Core 3+ (ie EF Core 5) outside of the top-level projection.,

#### EF Core 3.0+
As mentioned above EF Core 3.0+ only supports client evaluation at the top-level projection. So what would it look like if we tried to perform a LINQ query that needed client evaluation in a `.Where()` method to filter data? The example below is using `Microsoft.EntityFrameworkCore.SqlLite` version `5.0.3`. 

We have a `HasAlias` method that returns a `bool` and is trying to be used to filter the data. The only problem is that the database does not know how to apply the functionality of a method to a SQL statement, thus we get an `InvalidOperationException` at runtime.

```
private static bool HasAlias(Character marvelCharacter) => marvelCharacter.Name != marvelCharacter.HeroName;
static async Task Main(string[] args)
{
    var cancelToken = new CancellationTokenSource().Token;
    using (var marvelContext = new MarvelContext())
    {
        (await marvelContext.Characters.Where(x => HasAlias(x))
            .Select(x => x.HeroName)
            .ToListAsync(cancelToken))
            .ForEach(x => Console.WriteLine(x));
    }  
}
```
When the `Main` method is executed the exception is thrown.

![efcore_5_exception.png](https://res.cloudinary.com/aaron-bos/image/upload/v1615170184/efcore_5_exception_f7e4fe53b7.png)

There might be situations where you know your data better than EF Core and you are willing to accept the risk of client evaluation. We can still have this functionality by re-ordering our LINQ methods to complete the query before filtering.

```
(await marvelContext.Characters.ToListAsync(cancelToken)) // execute query to bring the data into memory
    .Where(x => HasAlias(x)) // filtering on the client works now
    .Select(x => x.HeroName)
    .ToList()
    .ForEach(x => Console.WriteLine(x));
```

#### EF Core 2.2
What does the example above look like when using EF Core 2.2? As mentioned earlier client evaluation anywhere in the query is supported before EF Core 3. When running the same code as above, but targeting EF Core 2.2 we'll see that we can successfully execute the query, but that a warning is logged to make us aware that client evaluation has taken place.

![efcore_2_2_log.png](https://res.cloudinary.com/aaron-bos/image/upload/v1615173289/efcore_2_2_log_fc7532b545.png)

The output:
```
Iron Man
Captain America
Scarlet Witch
Red Skull
```

One change that I would recommend to make that will ease the transition of EF Core 2.2 to EF Core 3+ is to make client evaluation (not in the top-level projection) throw an exception. We can do this by calling `ConfigureWarnings` when configuring our `DbContext`.

```
protected override void OnConfiguring(DbContextOptionsBuilder options)
{
    options.UseSqlite("Data Source=marvel.db")
        .ConfigureWarnings(warnings => warnings.Throw(RelationalEventId.QueryClientEvaluationWarning));
}
```
With this configuration in place, our query now throws an exception. This may not be something you can do in your codebase currently, but it's good to keep in mind if you are making the transition from EF Core 2.2 to EF Core 3+.

### Wrapping Up
In this post we talked quite a bit about EF Core and how queries may be translated and executed against the database. I think this kind of thought exercise is really important to be as productive as possible when using EF Core in our applications. I ran into this client evaluation situation first-hand recently, which is what prompted this post. Microsoft has a bit of [documentation](https://docs.microsoft.com/en-us/ef/core/querying/client-eval) on query evaluation that I built upon. Definitely check out the more general [docs](https://docs.microsoft.com/en-us/ef/core/) for more great information on using EF Core efficiently!


