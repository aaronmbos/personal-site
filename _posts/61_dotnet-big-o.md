---
id: 61
slug: dotnet-collections-big-o
title: "Collections in .NET Through the Lense of Big O Notation"
description: "We use collections in our code on a daily basis, but do we ever take a step back to think about how they perform in the context of common Big O Notation benchmarks? In this post, we'll examine the different collection types in .NET to see how there behaviors relate to well-known Big O notation functions. Let's dive in!"
publishedAt: 2023-01-DDTHH:MM:SS.000Z
updatedAt: 2023-01-DDTHH:MM:SS.000Z
metadata: dotnet,csharp,dev,fundamentals
---

- Lists

  - When adding to lists we should keep in mind capacity of the interal array. If the number of existing items in the list is less than the capacity, then adding to the list is O(1) otherwise this results in an O(n) operation [source](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.list-1.add?view=net-7.0#remarks)
  - When removing from lists a linear search is performed which results in O(n) performance, with n being the size of the collection.
  - What looking for or access specific items in a list, the performance is always O(n) where n is the size of the collection. This involves methods like `Contains`, `IndexOf`, `Find`, etc.

- Maps
- Sorted collections
