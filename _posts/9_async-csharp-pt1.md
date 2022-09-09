---
id: 9
slug: async-csharp-pt1
title: "Asynchronous Programming in C# - Part 1"
description: Writing code is hard. Writing asynchronous code is even harder. Luckily C# provides us with the `async` and `await` keywords to make asynchronous programming a little easier. This is the first of a series of posts in which I'll be going over writing asynchronous code in C# as well as a bit into the internals of how it works under the hood.
publishedAt: 2021-05-03T03:58:47.744Z
updatedAt: 2021-05-03T03:58:47.774Z
metadata: csharp,dotnet,introduction,dev
---
### What is "Asynchronous"?
Since this will be a series of posts, I think it makes sense to start from square one. *What do we mean by "asynchronous"?* Merriam-Webster defines asynchronous as:
> "not simultaneous or concurrent in time: not synchronous:

Cool, so how can we apply this asynchronous concept to our code? In programming doing something asynchronously basically means asking for something to happen (like accessing the file system or making a web request) while also being able to perform other work (like receive other requests), then getting notified when that "task" is complete (we `await` the result). When thinking about asynchronous programming in C#, the language follows the Task-based Asynchronous Pattern (TAP) to abstract the complexities of performing operations asynchronously. Let's take a brief look at that pattern to have a foundation for further discussion.

### Task-based Asynchronous Pattern (TAP)
TAP is a pattern that provides a clean and easy-to-use abstraction around asynchronous code. In my experience, I've found that it is more common to consume code that has implemented the requirements of TAP as opposed to implementing our own code to follow the pattern. With that being the case we'll look at some of the key implementation requirements so we can have an expectation of how to interact with asynchronous code.

1. Async Method Signatures
2. Exceptions
3. Task Status
4. Cancellation

#### Async Method Signatures
When it comes to asynchronous programming with TAP it's important to know that the entire asynchronous operation should occur inside a single method. TAP-based methods should adhere to the following standards.

- The method's return type needs to be **awaitable**. In .NET that means the method returns `System.Threading.Tasks.Task` or `System.Threading.Tasks.Task<TResult>`.
- An asynchronous method should be suffixed with `Async`. An example of this may be `RunAsync()` or `GetStringAsync()`. This naming convention is helpful for indicating that a method performs an asynchronous operation, but also that the return value should be awaited.
- An important caveat to note is that `ref` and `out` parameters should be avoided in async methods. This limitation is due to the way that async methods are transformed into state machines by the compiler (stay tuned to this series of posts for more info on what the compiler does with async methods).

Here's an example of an async method that adheres to the points above. The method returns a `Task` type and is suffixed with `Async`.

```
public Task RunAsync()
{
    // Do some stuff asynchronously
}
```

#### Exceptions in Async Methods
When calling async methods we can expect exceptions to feel pretty close to home when comparing them to how they occur in synchronous methods. The actual implementation of the exception inside the async method may not be as simple as its synchronous counterpart, but to the consumer it is similar. The main difference between an exception occurring in an async vs. synchronous method is that the exception in the async method is attached to the returned `Task` itself, andthe exception is thrown when the result of the `Task` is awaited. 

Let's look at the example below, in which you'll see the `GetStringAsync` method returns a `Task<string>` and results in `Task` that contains an exception. When we execute the method by assigning the `Task<string>` result to the variable `test`, we do not get an exception. So in the Console, we'll first see `No exception yet.`, but when we `await` the `test` task an exception will be thrown. You can copy and paste this code [here](https://try.dot.net/) to try it out.

```
using System;
using System.Threading.Tasks;

public class Program
{
  public static async Task Main()
  {
    var test = GetStringAsync();
    Console.WriteLine("No exception yet.");
    Console.WriteLine(await test); // Exception thrown here
  }

  private static Task<string> GetStringAsync() => Task.FromException<string>(new Exception("Oops"));
}
```

#### Async Task Status
The status of a Task relates directly to its lifetime and its current state within its lifecycle. The `Task` class exposes a `Status` property that will provide a value for the task's current status. This value is a `TaskStatus` enum, which is defined by the following members. In the previous example we used a Task that will throw an exception when awaited, but its `Status` when accessed before awaiting returns `Faulted`.

```
public enum TaskStatus
{
    // The task has been initialized but has not yet been scheduled.
    Created = 0,
    // The task is waiting to be activated and scheduled internally by the .NET Framework infrastructure.
    WaitingForActivation = 1,
    // The task has been scheduled for execution but has not yet begun executing.
    WaitingToRun = 2,
    // The task is running but has not yet completed.
    Running = 3,
    // The task has finished executing and is implicitly waiting for attached child tasks to complete.
    WaitingForChildrenToComplete = 4,
    // The task completed execution successfully.
    RanToCompletion = 5,
    // The task acknowledged cancellation by throwing an OperationCanceledException
    // with its own CancellationToken while the token was in signaled state, or the
    // task's CancellationToken was already signaled before the task started executing.
    Canceled = 6,
    // The task completed due to an unhandled exception.
    Faulted = 7
}
```

#### Async Task Cancellation
Cancellation is an important piece of the TAP design, but it is an optional feature for the both implementer and the consumer. If the async method supports cancellation, it will include a method parameter of the type `CancellationToken`, which accepts an instance of that type. In the event that an async method receives a request to cancel the operation via the `cancellationToken` argument, then we can make a few assumptions.

1. The returned tasks status will be `Canceled`. The canceled state is meant to be a final state for a task.
2. The `IsCompleted` property should return `true` when the operation is ended via cancellation.
3. If the task has a result (`Task<TResult>`) it should be empty and an exception should not be thrown when awaited.

An important callout here is that although a method accepts a `CancellationToken`, it doesn't necessarily mean the operation will always be canceled. That is ultimately up to the method's implementation and the only way to know if the Task has been canceled is to actually check its status.

### Wrapping Up
In this post, we covered what's meant by "asynchronous" and how it applies to our code at a high level. Then we went into some of the expectations that we have when writing asynchronous code in .NET by covering a bit of the Task-based Asynchronous Pattern. As I mentioned earlier, this first post is part of a larger series that I am writing about asynchronous code in C#. Next time we'll take a closer look at how we can write asynchronous code in .NET using `async` and `await`.

##### Resources
[https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/async/task-asynchronous-programming-model](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/async/task-asynchronous-programming-model)

[https://docs.microsoft.com/en-us/dotnet/standard/asynchronous-programming-patterns/task-based-asynchronous-pattern-tap](https://docs.microsoft.com/en-us/dotnet/standard/asynchronous-programming-patterns/task-based-asynchronous-pattern-tap)

[https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/async/](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/async/)