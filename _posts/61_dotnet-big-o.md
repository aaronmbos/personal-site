---
id: 61
slug: dotnet-collections-big-o
title: "Collections in .NET Through the Lense of Big O Notation"
description: "We use collections in our code on a daily basis, but do we ever take a step back to think about how they perform in the context of common Big O Notation benchmarks? In this post, we'll examine the different collection types in .NET to see how there behaviors relate to well-known Big O notation functions. Let's dive in!"
publishedAt: 2023-01-DDTHH:MM:SS.000Z
updatedAt: 2023-01-DDTHH:MM:SS.000Z
metadata: dotnet,csharp,dev,fundamentals
---

Collections are an integral part of almost any application that we build or maintain as software engineers. The concept of traversing collections with a for-loop is often one of the first paradigms learned by new engineers. Collection-like objects exist in most, if not all, languages. In C# we have several options when it comes to collections and each option comes with tradeoffs. As software engineers it is our job to choose the right tool for the job. The decision of what kind of collection to use for a given scenario needs to consider the context in which the collection will be used. We should ask ourselves _Will the collection be iterated, searched, or manipulated heavily during normal operations?_ The collection type we choose for a given scenario could have massive performance impacts on the application and it's users.

We are going to be focusing on a few specific collection types in C# to determine how they perform in regards to Big O notation when searching for and manipulating elements of each collection type. This post doesn't require you to be an expert in Big O notation, but it does assume a basic understanding of the topic. I will be focusing on the following collection types.

- `List<T>`
- `Dictionary<TKey, TValue>`
- `HashSet<T>`
- The sorted counterparts of these collections

There are many other collection types that could be covered, but I wanted to focus on the types that I've used and seen most in my career. If you're interested in learning more about the Big O notation in regards to other .NET collection types, I would highly encourage digging into it for yourself!

## `List<T>`

I would consider `List<T>` to be the most commonly used collection type in the .NET ecosystem. That means we should understand how we can use it effectively and its performance when carrying out certain tasks. In terms of Big O notation, I'd say that most `List<T>` operations can be expected to be linear or **O(n)**. Linear operation runtime is directly affected by the size of the input being processed. As the input size grows the runtime should grow linearly proportional to the input growth.

### Manipulating lists

Manipulating a collection is a common operation and typically involves adding or removing items from the collection. Normally the add and remove functionality runs at O(n). Below is a screenshot of benchmark results adding a random number to a `List<T>` at increasing sizes. As the size of the of the list grows, the mean runtime also grows _near linearly_.

![list-add-linear](https://res.cloudinary.com/aaron-bos/image/upload/v1673574244/list-add-linear_a5kyly.png)

While typically list manipulation runtimes are linear, there is an exception when adding to lists. When a list is created, there is an overloaded constructor that accepts an integer to indicate the `Capacity` of the list. If we create a list with a defined capacity and the `Count` property at the time of adding is **less than** the `Capacity` property, then adding to a list is **O(1)** or constant time. The reason for this is that the underlying array does not need to be expanded to accomodate the new element. This means that the speed of the operation is not affected by the size of the input (in this case the size of the collection). We can see this in action in the benchmarks below. As the input size grows linearly, the runtime of adding an element to the list remains constant.

![capacity-list-add-constant](https://res.cloudinary.com/aaron-bos/image/upload/v1673574477/capacity-list-add-constant_h7wsya.png)

### Searching lists

When working with collections we often need to search the collection for a particular element. This could be with `.Find`, `.Contains`, `.IndexOf`, `.Where`, and other methods that look for a particular element in a collection. For this reason its important to understand that the runtime of searching for an element in list is also O(n) or linear. The algorithm to find an element most likely needs to iterate through each element to find the one that it is looking for. In the worst case scenario the item isn't in the list and we've had to look at every element. This results in the linear runtime. We can see this in the benchmarks below using the `.Find` method to find a specific element in a list.

![list-find-linear](https://res.cloudinary.com/aaron-bos/image/upload/v1673574868/list-find-linear_vtswgr.png)

## `Dictionary<Tkey, TValue>` and `HastSet<T>`

In this section we are going to focus on a couple of hash-based collection types, which are `Dictionary<TKey, TValue>` and `HashSet<T>`. While these are different types they both rely on hashing algorithms to store and keep track of the elements that are contained inside of their collections. As we look at manipulation and searching operations we'll see some similarities with `List<T>`, but there are also some key differences that make these hash-based types appealing in certain scenarios.

### Manipulating hash-based collections

Both `Dictionary<Tkey, TValue>` and `HashSet<T>` are unsorted collection types, just like `List<T>`. We can also expect these hash-based collections to perform similarly to that of lists when it comes to manipulating elements. The documentation states that when adding items from a dictionary or hash set without a defined `Capacity`, the operation will have a linear, or **O(n)**, runtime. If we have defined a value for `Capacity` and the `Count` value is less then the capacity when adding, the operation will be performed in constant time or **O(1)**.

Interestingly enough when I performed benchmarks of this data, I noticed that the `Add` method performed almost identically when explicitly setting the capacity and when not. I took at look at the source code for the `Dictionary` class [here](https://github.com/dotnet/runtime/blob/6aaaaaa5c7b1160a237bb381074e707c3ea1e9b4/src/libraries/System.Private.CoreLib/src/System/Collections/Generic/Dictionary.cs#L473), which was quite interesting but a little challenging to follow without a little context. Ultimately it appears that adding to a dictionary always occurs in nearly constant time.

![dict-add-benchmark](https://res.cloudinary.com/aaron-bos/image/upload/v1673574868/dict-add-benchmark_eurauo.png)

When it comes to removing elements from a dictionary or hash set, the operation is **always** performed in constant time. The reason for this being that the stored hashed values can be easily found in the underlying hash table for each of these collection types. Let's take a look at some benchmarks that confirm these behaviors and their runtimes. The example below shows the benchmark results for removing elements from `HashSet<T>`.

![hash-set-remove-constant](https://res.cloudinary.com/aaron-bos/image/upload/v1673575775/hash-set-remove-constant_pqew6h.png)

### Searching hash-based collections

We've seen some of the efficiences that we can gain from using hash-based collections when manipulating data. Now we're going to look at their performance when searching for specific elements. There was one operation that we discussed previously that may provide a tip as to what the search performance might be...and that was the `Remove` operation. If we think about what needs to happen to remove an element from a hash-based collection, we first need **find the element**, then we need to remove it. Searching is essentially the same operation without the removal, so if you remember that removal is performed in constant time we should be able to assume that searching is also performed in constant time or **O(1)**. Fortunately that's a correct assumption as we'll see the runtimes approaching constant time in the following examples. The examples will show indexing into a dictionary and also calling `HashSet<T>.TryGetValue`.

![dict-index](https://res.cloudinary.com/aaron-bos/image/upload/v1673581722/dict-index_czkosn.png)

![hashset-trygetvalue](https://res.cloudinary.com/aaron-bos/image/upload/v1673581700/hash-set-trygetvalue_dvphan.png)

## Sorted Collections

So far we've looked at `List<T>`, `Dictionary<TKey, TValue>`, and `HashSet<T>` and how they perform different actions through the lense of big O notation. I wanted to take a quick look generally at sorted collections and their runtimes for the operations we've examined for previous types. Those operations being adding, removing, and searching each of the collections. One similarity between sorted collections and the ones discussed already is that the runtime is still O(n) when the internal capacity of the underlying data structure needs to grow due to the operation.

In most circumstances we can expect sorted collections to perform operations in logarithmic time or **O(log n)**. This means that the runtime does change as the input size grows, but less drastically as the input size continues to grow.

![ologn](https://res.cloudinary.com/aaron-bos/image/upload/v1673664700/ologn_a8jdrn.png)

Although I haven't used sorted collections often in my day-to-day, I think it's useful to examine at least one benchmark to confirm their behavior, but also to be aware of their performance features. If there is a data set that we know will always be sorted, maybe it makes sense to use a `SortedList<TKey, TValue>` instead of a `List<T>`. Decisions always come with tradeoffs and being fully aware of the options and their implications is key to making the most correct decision. Let's take a look at the performance benchmarks for adding to and searching a `SortedList<TKey, TValue>` and confirm that we see close to logarithmic runtimes.

![sorted-list-add-get](https://res.cloudinary.com/aaron-bos/image/upload/v1673664773/sorted-list-add-get_cwxlfs.png)

The goal of this post wasn't necessarily to share the runtimes for each of these operations on the different collection types. That can be found easily in the documentation. The main goal was to present this information in a way that highlights the performance features of each operation and type in given scenarios. With this information we should be prepared to choose the correct collection for any problem that is thrown our way.

If you'd like to checkout any of the benchmark code, head over to this [repo](https://github.com/aaronmbos/dotnet-collections-big-o). If I'm being honest this was my first introduction into [BenchmarkDotnet](https://benchmarkdotnet.org/) and it was a great learning experience. While the benchmarks mostly represent the runtimes as expected, there may be some margin of error due to the way that the benchmarks had to be set up. Unfortunately performing very fast mutations isn't super simple to benchmark, so some of the setup for each benchmark run may be included in the executed times.
