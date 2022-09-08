---
id: 17
slug: parallel-foreach-csharp
title: "How to Use C#'s Parallel.ForEach"
description: There are certain operations performed in code that lend themselves to being executed in parallel. Some might even call these tasks "embarrassingly parallel". In this post we'll be going over how we can use C#'s Parallel.ForEach to iterate over collections in parallel.
publishedAt: 2021-09-16T02:39:43.523Z
updatedAt: 2021-09-17T01:12:11.046Z
metadata: dev,introduction,dotnet,parallel,csharp
---
## Types of Parallel Tasks

Using parallelism to utilize multiple cores on a machine is done behind the scenes by a lot of commonly used software. In order to parallelize our own code, we need to take a few things into consideration.

1. Partition the work in manageable "chunks"
2. Execute the partitioned chunks in parallel on multiple threads
3. Aggregate the results in using thread-safe constructs

When it comes to thinking about parallelization there are two main concepts that we'll want to consider. These concepts are not all-encompassing, but many of the tasks that we want to perform in parallel will fall in one of these two buckets.

1. **Task Parallelism**: Involves partitioning different _tasks_ that can be performed in parallel. The order of the tasks starting and completing should be unimportant.
2. **Data Parallelism**: Involves partitioning the _data_ to perform the same task on the partitions in parallel.

With this information in mind we're ready to jump in and start learning how we can utilize multiple cores when iterating over collections in C#.

## Introduction to Parallel.ForEach

The main use case for choosing `Parallel.ForEeach` over the standard `foreach` involves the need to iterate through a collection while utilizing multiple cores, which **can** lead to better performance. As mentioned previously there are certain tasks that lend themselves to being parallelized, so you'll want to make sure that what you're trying to do will actually benefit from parallelization. We'll get into some of these considerations a bit later, but for now let's take a look at how `Parallel.ForEach` differs from `foreach`.

To start off, we'll be looking at the most basic method [signature](https://docs.microsoft.com/en-us/dotnet/api/system.threading.tasks.parallel.foreach?view=net-5.0) `ForEach<TSource>(IEnumerable<TSource> source, Action<TSource> body);`. As you can see it accepts a collection and an Action of the same type the collection is using. Let's take a look at the following example that will iterate through a list of Pokemon objects and change the `Owner` property. We will sort the list alphabetically so that we can see the parallelization based on the Console output.

When you run the console app, you'll notice that the output is not in alphabetical order and that is because the iteration happens on different threads. This is a pretty trivial example, but hopefully it showcases the result of iterating over a collection in parallel.

```
class Program
{
    static void Main(string[] args)
    {
        Parallel.ForEach(GetPokemon().OrderBy(p => p.Name), (p) => 
        {
            Console.WriteLine($"Changing owner for {p.Name}");
            p.Owner = "Aaron";
        });
    }

    static IEnumerable<Pokemon> GetPokemon() => new List<Pokemon>
    {
        new Pokemon("Pikachu", "Electric", "Ash"),
        new Pokemon("Bulbasaur", "Grass", "Ash"),
        new Pokemon("Squirtle", "Water", "Ash"),
        new Pokemon("Charmander", "Fire", "Ash"),
        new Pokemon("Gengar", "Ghost", "Ash"),
        new Pokemon("Snorlax", "Normal", "Ash"),
        new Pokemon("Mew", "Psychic", "Ash"),
    };
}

public class Pokemon
{
    public Pokemon(string name, string type, string owner)
    {
        Name = name;
        Type = type;
        Owner = owner;
    }

    public string Name { get; set; }
    public string Type { get; set; }
    public string Owner { get; set; }
}
```

One of the key components of loop parallelization is the concept of "loop body dependencies". For parallel loops to be reliable we want to make sure that the action taking place in the loop does not have any external dependencies. In other words, the work happening inside of a parallel loop should be independent of work happening in another loop iteration (potentially on another thread). Sharing dependencies between loop bodies could cause weird behavior and most likely lead to bugs.

### Accessing the Index in Parallel.ForEach

There may be times where we want to access the index of the current iteration during a parallel `ForEach` loop. This can be done with this overload `ForEach<TSource>(IEnumerable<TSource>, Action<TSource,ParallelLoopState,Int64>)`. The part of that we'll be looking for in this overload is the final `Int64` type parameter on the `Action<TSource,ParallelLoopState,Int64>`. Notice that we are now printing the index (i) along with the Name property to the console. With the example data that we used previously that was sorted alphabetically Bulbasaur would be printed with the `0` index (not necessarily printed first to the console though be the iterations happen in parallel).

```
Parallel.ForEach(GetPokemon().OrderBy(p => p.Name), (p, s, i) => 
{
    Console.WriteLine($"{i}. Changing owner for {p.Name}");
    p.Owner = "Aaron";
});
```

## PLINQ Alternative to Parallel.ForEach

We've just discussed the basics of `Parallel.ForEach` method, which can be used just like the normal `foreach`. With that in mind, you may be wondering if there is LINQ alternative for parallel iteration and there is. It is known as PLINQ. As you can probably guess PLINQ stands for Parallel Integrated Query. PLINQ provides many of the same methods and functionality in LINQ, except they are executed in parallel. The method that we'll be concerned with here is `ForAll`, which is an extension method on the [ParallelEnumerable](https://docs.microsoft.com/en-us/dotnet/api/system.linq.parallelenumerable.forall?view=net-5.0) class. It is very similar to `Parallel.ForEach` in that it accepts an action to perform on a `ParallelQuery<T>` collection. If we were to convert the previous example into `ForAll`, with could look something like.

```
GetPokemon().OrderBy(p => p.Name).AsParallel().ForAll(p => 
{
    Console.WriteLine($"Changing owner for {p.Name}");
    p.Owner = "Aaron";
});
```

As you can see this example is pretty similar to our previous and is functionally equivalent. PLINQ opens up a lot of opportunity to compose and chain a series of parallel iterations with all the methods it provides. As with anything it is always important to test the code we write to confirm our assumptions. If the goal of implementing parallel actions is to improve performance, it is vital to test and verify that executing in parallel actually does improve performance in the given situation.

## When Not to Parallelize?

It's important to consider situations that are not well suited for parallelization when debating whether or not a task can be completed in parallel. As we've discussed earlier any task or action that requires mutating shared state will not work well being parallelized. To provide a concrete example of this I'll discuss a time that I wanted to parallelize some actions that used Selenium Web Driver to gather data from a webpage. Parallelizing in this situation was not an option in the context of single Selenium Driver instance because the actions that needed to be performed were using that same instance to perform actions (like clicking on buttons to show modal dialogs) in the browser.

Another situation where parallelization may not be the best fit is when order is important. In most cases parallelizing multiple actions or tasks will lead to them being completed in a different order than when they were started. This may cause issues in a situation where a specific order or sequence is expected.

In any situation that parallelization is being considered it's always best to test outperforming the action sequentially and in parallel to be able to determine the most efficient solution. Like most things parallelization is not a silver bullet and should be used when it fits the problem to solve.
