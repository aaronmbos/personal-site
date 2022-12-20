---
id: 58
slug: csharp-flags-enum
title: "Defining and Using Enums as Bit Flags in C#"
description: "I've been using enums in C# since the beginning of my development career. In this post, we are going to dive into how the Flags attribute can be applied to enums and also the different kinds of operations that come into play we an enum is defined as a bit flag. Let's dive in!"
publishedAt: YYYY-MM-DDTHH:MM:SS.000Z
updatedAt: YYYY-MM-DDTHH:MM:SS.000Z
metadata: csharp,dotnet,dev,fundamentals
---

Quick intro about why I'm writing this post and what the reader can expect.

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
