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

![List<int>.Add benchmark](https://res.cloudinary.com/aaron-bos/image/upload/v1673232012/list-add_sel3i6.png)

While typically list manipulation runtimes are linear, there is an exception when adding to lists. When a list is created, there is an overloaded constructor that accepts an integer to indicate the `Capacity` of the list. If we create a list with a defined capacity and the `Count` property at the time of adding is **less than** the `Capacity` property, then adding to a list is **O(1)** or constant time. This means that the speed of the operation is not affected by the size of the input (in this case the size of the collection). We can see this in action in the benchmarks below. As the input size grows linearly, the runtime of adding an element to the list remains constant.

![capacity-list-add-constant](https://res.cloudinary.com/aaron-bos/image/upload/v1673316371/capacity-list-add-constant_avjwfy.png)

### Searching lists

When working with collections we often need to search the collection for a particular element. This could be with `.Find`, `.Contains`, `.IndexOf`, `.Where`, and other methods that look for a particular element in a collection. For this reason its important to understand that the runtime of searching for an element in list is also O(n) or linear. The algorithm to find an element most likely needs to iterate through each element to find the one that it is looking for. In the worst case scenario the item isn't in the list and we've had to look at every element. This results in the linear runtime. We can see this in the benchmarks below using the `.Find` method to find a specific element in a list.

![list-find-linear](https://res.cloudinary.com/aaron-bos/image/upload/v1673316371/list-find-linear_lbf5yz.png)

## `Dictionary<Tkey, TValue>`

## `HastSet<T>`

## Sorted Collections