---
id: 46
slug: cancellation-csharp-dotnet
title: "Introduction to Cancellation in .NET"
description: As software development evolves and adopts asynchronous paradigms, the need for cancellation support in applications has become more prevalent. In this post, we will learn about the core concepts in regards to cancellation in .NET code. This post will provide a solid foundation for continued learning on the concept of cancellation. Let's dive in!
publishedAt: 2022-08-11T01:30:59.389Z
updatedAt: 2022-08-11T01:55:53.153Z
metadata: dev,introduction,dotnet,csharp
---
## Why is Cancellation Necessary?

Before getting too deep into methods of cancellation and the approach in .NET, I think it would be helpful to first discuss why cancellation is even necessary. At a high-level cancellation refers to the termination of some process or application. The Unix `kill` command is a form of cancellation because a signal is sent to a process requesting it to exit.

The reasons for cancellation may be endless and application-specific, but some of the most common are listed below.

- Stop long-running process(es)
- End a process that is no longer needed or was fulfilled by a separate process
- Cancel a running process after a period of time
- Reclaim resources (threads, tasks, locks, etc) to be used elsewhere

In .NET specifically, the concept of cancellation has become more prevalent with the wider adoption of asynchronous programming. Many of the asynchronous library methods in .NET contain parameters supporting cancellation, allowing for all of the situations above to be implemented if needed. Next, we'll be looking at the most common modes of cancellation.

## Modes of Cancellation?

The most common modes of cancellation can be split into two buckets for classification. The first is forced cancellation in which the process being cancelled has no way to deny or ignore a cancellation request. The second bucket contains more cooperative modes that follow a pattern similar to "ask don't tell". Cancellation modes in the cooperative bucket have the ability to gracefully respond to cancellation requests from particular sources.

### Forced Cancellation

Forced cancellation methods should be avoided whenever possible. This includes things like `Thread.Abort`, `Process.Kill`, etc. The reason for this is that there is no guarantee that the terminated process will be in a state where it can terminate cleanly. There may be corrupted memory or transactions, locks released or deadlocked, or undisposed resources. There is also no guarantee that killing a single process won't affect other processes as well. For these reasons we should avoid forcing cancellation unless it is absolutely necessary or if we can be sure that the termination won't lead to a corrupted state.

### Cooperative Cancellation

Cooperative cancellation methods differ from forced methods for a few reasons listed below.

1. Requires effort from consumer to support cancellation
1. Less prone to state corruption than forced cancellation methods
1. The cancellation requestor will ask for cancellation, which can be done at predetermined checkpoints, at any time via polling, or not at all

Let's break down these reasons in a little more detail. Cooperation typically involves more than one party doing something together. In the context of cancellation, cooperation takes place when the cancellation source requests a consumer to cancel their operation. At this point, the consumer can (1) immediately cancel, (2) cancel when it makes sense, or (3) completely ignore the request.

The cooperative methods of cancellation are preferred because they are less likely to result in the corruption of state due to unexpected termination. Allowing the consumer to participate in the decision of cancellation also leads to much more predictable outcomes when it comes to cancelling an operation or process.

## Cancellation in .NET

With all of the context on general cancellation, we're now ready to get into some of the .NET specifics with cancellation. First, .NET implements cancellation in a completely cooperative manner. The implementation is built upon two main types that we'll talk about in some detail here. First, is the `CancellationTokenSource` and as you may have guessed from the name this type is the source with which an operation can be cancelled. Secondly, is the `CancellationToken` itself which is created by the `CancellationTokenSource` and used to request cancellation at any point in the call stack.

The `CancellationTokenSource` has a variety of methods and properties available, but the main ones that we'll be focused on for the purpose of this post are the `Token` property, `Cancel()`, and `Dispose()`. The `Token` property is used to get the `CancellationToken` that is associated with the source. We'll discuss the token a bit later, but it is mainly used to respond to cancellation requests from the source. The next two methods are pretty obvious by their name, but I think they're worth calling out. The `Cancel()` method will request cancellation via the token that was generated from the token source. As mentioned previously downstream code does not need to acknowledge or respond to cancellation requests in the cooperative methods of cancellation. Finally, we have the `Dispose()` method, which like other `IDisposable` implementations is used to dispose of any unhandled resources from the `CancellationTokenSource`. It is always best to call `Dispose` once the `CancellationTokenSource` object is no longer needed.

The CancellationToken itself is the object used to communicate a cancellation request. As mentioned previously the token is generated from the source and meant to be propagated downstream to callers. If any of the callers support cancellation they are able to read the `IsCancellationRequested` property to determine if cancellation needs to take place. We also have the `CanBeCanceled` property, which indicates whether or not a token can ever be cancelled. An example of a token that can never be in a cancelled state is the token returned from `CancellationToken.None`.

Let's take a look at a little example to provide more clarity around the interaction between `CancellationTokenSource` and the `CancellationToken`. In the example below we replace the explicit call to `Dispose()` on the `CancellationTokenSource` with a `using` statement. The main goal of the example is to demonstrate how a running task can respond to a cancellation request at any point in time. In order to see the condition where the token is not cancellable, we can replace the argument for `MethodThatDoesWork` with `CancellationToken.None` instead of the actual token.

```csharp
using (var cancelTokenSource = new CancellationTokenSource())
{
    Console.WriteLine("Starting a process. Press Enter to cancel.");

    var task = MethodThatDoesWork(cancelTokenSource.Token);

    var input = Console.ReadKey().Key;
    while (input != ConsoleKey.Enter)
    {
        input = Console.ReadKey().Key;
    }

    cancelTokenSource.Cancel();

    await task;
    Console.WriteLine(task.Status);
}

async Task MethodThatDoesWork(CancellationToken token)
{
    if (!token.CanBeCanceled)
    {
        Console.WriteLine("Token in a state that can't be cancelled. Nothing to see here.");
        return;
    }

    while (!token.IsCancellationRequested)
    {
        await Task.Delay(500);
    }

    Console.WriteLine("Token has been cancelled. Terminating gracefully...");
    return;
}
```

![cancellation-example.gif](https://res.cloudinary.com/aaron-bos/image/upload/v1660182593/cancellation_example_9302a106ab.gif)

Cancellation is a pretty deep topic and this post's goal was to scratch the surface to provide a platform for a deeper understanding (if that's your thing). I do think it's important to call out that most developers don't deal with cancellation often (if ever). The extent that we need to interact with cancellation is passing a token from one method to another. With that being said having knowledge of how cancellation occurs could definitely be helpful should we ever need to utilize it in our day-to-day.

#### Resources

[https://www.drdobbs.com/parallel/interrupt-politely/207100682](https://www.drdobbs.com/parallel/interrupt-politely/207100682)

[https://devblogs.microsoft.com/pfxteam/net-4-cancellation-framework/](https://devblogs.microsoft.com/pfxteam/net-4-cancellation-framework/)
