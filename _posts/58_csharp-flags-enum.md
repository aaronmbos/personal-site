---
id: 58
slug: csharp-flags-enum
title: "Defining and Using Enums as Bit Flags in C#"
description: "I've been using enums in C# since the beginning of my development career. In this post, we are going to dive into how the Flags attribute can be applied to enums and also the different kinds of operations that come into play we an enum is defined as a bit flag. Let's dive in!"
publishedAt: YYYY-MM-DDTHH:MM:SS.000Z
updatedAt: YYYY-MM-DDTHH:MM:SS.000Z
metadata: csharp,dotnet,dev,fundamentals
---

I've been using enumerations (enums) in C# since my earliest days learning the language. In that time I've seen them used for many purposes, some fitting and some not so fitting. I've found that one of the more common use cases for enums is for them to be treated as bit flags. If you're not familiar with the concept of bit flags, don't worry I'll cover that in this post along with some additional information surrounding bit flag enums. I'll be the first to admit that using enums as bit flags can be a bit confusing, but their ability to represent combinations of values with a single named constant can be useful in a number of scenarios.

## Using the Flags Attribute

Relatively short section explaining the Flags attribute and the functionality it provides enums when applied.
[docs](https://learn.microsoft.com/en-us/dotnet/api/system.flagsattribute)

## Defining Enum Members and Values

Defining member values with numeric integral type literals
Defining member values with binary literals
Defining member values with bit shifting

### Quick Detour on Bit Shifting

[docs](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/bitwise-and-shift-operators#left-shift-operator-)

## Logical Bitwise Operations

A slightly detailed section on bitwise operations and their utility with flag enums
[docs](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/bitwise-and-shift-operators#logical-and-operator-)
