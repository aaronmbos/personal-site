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

I would consider `List<T>` to be the most commonly used collection type in the .NET ecosystem. That means we should understand how we can use it effectively and its performance when carrying out certain tasks. In terms of Big O notation, I'd say that most `List<T>` operations can be expected to be linear or **O(n)**. Linear operation runtime is directly affected by the size of the input being processed. As the input size grows the runtime should grow linearly proportional to the input growth. There are some exceptions to this, which we'll look at next.

### Manipulating lists

We're going to be focusing on adding to and removing from lists. Typically the add and remove functionality runs at O(n). Below is a screenshot of benchmark results adding a random number to a `List<T>` at increasing sizes. As the size of the of the list grows, the mean runtime also grows _near linearly_.

![List<int>.Add benchmark](https://res.cloudinary.com/aaron-bos/image/upload/v1673232012/list-add_sel3i6.png)

### Searching lists

- When adding to lists we should keep in mind capacity of the interal array. If the number of existing items in the list is less than the capacity, then adding to the list is O(1) otherwise this results in an O(n) operation [source](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.list-1.add?view=net-7.0#remarks)
- When removing from lists a linear search is performed which results in O(n) performance, with n being the size of the collection.
- What looking for or access specific items in a list, the performance is always O(n) where n is the size of the collection. This involves methods like `Contains`, `IndexOf`, `Find`, etc.

## `Dictionary<Tkey, TValue>`

## `HastSet<T>`

## Sorted Collections
