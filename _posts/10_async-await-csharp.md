---
id: 10
slug: async-await-csharp
title: "Using Async and Await in C#"
description: Async and Await are important keywords in C#. In this post, we'll be looking into how we can use `async` and `await` to write asynchronous code in the same manner that we write synchronous code. For a higher-level look at asynchronous programming in C# check out my previous post where we discussed the Task-based Asynchronous Programming pattern and more!
publishedAt: 2021-05-17T04:35:32.513Z
updatedAt: 2021-05-17T04:35:32.646Z
metadata: dev,dotnet,csharp
---
### Async and Await Keywords
The `async` and `await` keywords are vital to asynchronous code in C#. When used together, `async` and `await` abstract a great deal of the complexity and boilerplate code required to effectively implement asynchronous functionality. They are both contextual keywords in that they provide meaning in certain contexts of code, but are not reserved keywords. Let's first take a look at `async`.

#### Async Modifier
 The `async` modifier is used to signify that a method, lambda expression, or anonymous method is **asynchronous**. It has no effect on a method's signature and only affects what occurs inside of the method. When the compiler sees the `async` modifier, it then knows to treat `await` inside of the method or expression as a keyword instead of an identifier. With that being said an `await` operator isn't required inside of an async method, but you will see a [compiler warning](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/compiler-messages/cs4014) if the async method doesn't await any operation.

![async-no-await.png](https://res.cloudinary.com/aaron-bos/image/upload/v1621221279/async_no_await_c21cf3cc07.png)

When an `await` operator is encountered in an async method, a continuation is attached to the awaited task, and execution returns to the caller. The continuation is an important piece of this because it makes sure that when the awaited task completes, execution returns to the method to pick up where it left off. In the event that the returned task is faulted (ie an exception occurred while completing the task), the exception will be re-thrown. It's very difficult to discuss the `async` modifier without mentioning `await` (*as you've just noticed* 😰), so let's take a closer look.

#### Await Operator
The purpose of the `await` operator is to suspend the execution of an asynchronous method or lambda expression until the asynchronous operation being awaited is complete or returns a result. While the asynchronous method is "suspended", control is returned to the caller to be able to service other requests or do other work. Once the awaited asynchronous operation is completed, control is returned to the enclosing method. Here is an example of an asynchronous method using the await operator.

```
public async Task<IEnumerable<T>> ExecuteQueryAsync<T>(string querySql)
{
    await using (var conn = new NpgsqlConnection(_configuration.GetConnectionString(EplStatsDb)))
    return await conn.QueryAsync<T>(querySql);
}
```

In the previous example, we immediately return the awaited result of the `QueryAsync` method. That is not a requirement though. We can actually assign the result of the `QueryAsync` method to a variable and await the result later. For example.

```
public async Task<IEnumerable<T>> ExecuteQueryAsync<T>(string querySql)
{
    await using (var conn = new NpgsqlConnection(_configuration.GetConnectionString(EplStatsDb)))
    {
         var queryTask = conn.QueryAsync<T>(querySql);
        // We could do some more stuff here ...
        return await queryTask;
    }
}
```

In the event that the operation being awaited has already completed at the time of awaiting, the execution is not suspended and the result is returned immediately. The `await` operator may seem a little like magic, but in reality, it just abstracts some boilerplate code that is responsible for getting the result of an asynchronous operation when completed. When the compiler encounters an `await` operator, it actually ends up looking something like this.

```
var awaiter = SomeMethodAsync().GetAwaiter();
awaiter.OnCompleted(() => 
{
    var result = awaiter.GetResult();
    Console.WriteLine(result); // Obviously won't write the result to the Console
});
```

### Working with Tasks
The `System.Threading.Tasks` namespace is at the heart of asynchronous operations in C#. More specifically the `Task` and generic `Task<T>` types are used to gain access to the current state and end result of an asynchronous operation. As we've seen in examples so far we can `await` the result of an asynchronous operation that returns `Task` or `Task<T>`, which indicates that the operation is complete and obtains the result of the operation if there is one. There are a couple of useful methods in the `Task` class that I'd like to cover and they are `Task.WhenAll` and `Task.WhenAny`. These methods may seem similar in name, but the functionality they offer will dictate the context in which they should be used. Let's take a look at `Task.WhenAll` first.

There may come a time when we want to execute multiple asynchronous operations, but just want to be notified when all of them are complete. This is where `Task.WhenAll` shows up to save the day. This method has a few overloads, but it boils down to being able to send a collection of Tasks to `WhenAll(tasks)` and receive a Task in return (or potentially a `Task<T[]>` where `T` is the result type of the tasks passed to `WhenAll`). In this situation we can't do anything with individual tasks as they complete, so we need to await the completion of ALL tasks before we continue. Let's look at an example.

```
class Program
{
    private static HttpClient _httpClient = new HttpClient();
    static async Task Main(string[] args)
    {
        var posts = new string[] 
        {
            "https://aaronbos.dev/posts/async-csharp-pt1",
            "https://aaronbos.dev/posts/learning-framework",
            "https://aaronbos.dev/posts/update-json-postgresql"
        };

        var blogPostTasks = new List<Task<string>>();
        foreach (var post in posts)
            blogPostTasks.Add(_httpClient.GetStringAsync(post));
        // We await the result of WhenAll here to iterate through the resulting string[]
        foreach (var html in await Task.WhenAll(blogPostTasks))
            Console.WriteLine(html);
    }
}
```

Using `Task.WhenAll` gives us a way to ensure all of the provided tasks are complete, but what if we have a collection of tasks that we can operate on **as they complete** instead of when they've all completed. This is where `Task.WhenAny` comes in. `Task.WhenAny` is similar to `Task.WhenAll` in that it accepts a collection of tasks as a parameter (with various overloads), but the difference being that the method will return any task that is complete or completes upon awaiting. It is also important to note here that a `Task` or `Task<T>` is returned, not the result of the task. There could be an instance when we want to know when any requested tasks have completed then move on, but I think the more likely scenario is to iterate through a collection of tasks then operate on the result of the one that has completed **at the time of completion**. We can then remove the completed task from the collection and repeat the process. An example will help provide more clarity.

```
class Program
{
    private static HttpClient _httpClient = new HttpClient();
    static async Task Main(string[] args)
    {
        var posts = new string[] 
        {
            "https://aaronbos.dev/posts/async-csharp-pt1",
            "https://aaronbos.dev/posts/learning-framework",
            "https://aaronbos.dev/posts/update-json-postgresql"
        };

        var blogPostTasks = new List<Task<string>>();
        foreach (var post in posts)
            blogPostTasks.Add(_httpClient.GetStringAsync(post));

        while (blogPostTasks.Any())
        {
            var post = await Task.WhenAny(blogPostTasks);
            // do some stuff with the completed task
            Console.WriteLine(await post);
            // Then remove the completed task from the collection
            blogPostTasks.Remove(post);
        }
    }
}
```

#### Pitfalls of Asynchronous Programming
So far you may be thinking that asynchronous code is great and you're right, but it doesn't come without some things to be mindful of. I am actually going to refrain from laying out all of the potentially sharp edges with async code in C# and instead provide a **very useful** link to a README that I've found helpful in avoiding pitfalls of async code. This [README](https://github.com/davidfowl/AspNetCoreDiagnosticScenarios/blob/master/AsyncGuidance.md) was initially created by David Fowler. It lays out a lot of the things that we shouldn't do when trying to write async code, but it also provides great examples of things we should do. In most cases, I would try to summarize the bits of the documentation, but I think it's more valuable to review it and keep it in mind for future reference. I know that I've referred to it several times as I've been implementing async code day-to-day.

### What's Next?
In this post, we've covered using `async` and `await` along with some useful functionality on tasks. I also provided a useful [link](https://github.com/davidfowl/AspNetCoreDiagnosticScenarios/blob/master/AsyncGuidance.md) that will help us avoid common mistakes of async programming in C#. The final part of this little series on asynchronous programming will be looking into how asynchronous code actually works behind the scenes. How is control relinquished and returned? How do continuations work? Along with all of the other juicy details that come to mind when wondering *What actually happens when we execute asynchronous operations?*