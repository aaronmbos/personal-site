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

The first step to defining an enum as a bit flag is to add the `Flags` attribute to the enum type. In practice this looks like the example below. It is a common [convention](https://learn.microsoft.com/en-us/dotnet/standard/design-guidelines/names-of-classes-structs-and-interfaces#naming-enumerations) in .NET to use a plural name for enums that are defined as flags.

```csharp
[Flags]
public enum BurgerToppings
{
    // Enum members
}
```

By adding the `Flags` attribute the enum will now be treated as a set of bit flags instead of a standard enum. If you're unfamiliar with the concept of a bit flag, you can imagine each member representing one bit. The members should be defined to represent single bits or we can also define members as a combination of multiple bits. Let's expand on our previous example by adding some members to the `BurgerToppings` enum.

```csharp
[Flags]
public enum BurgerToppings
{
    None = 0,
    Ketchup = 1,
    Mustard = 2,
    KetchupAndMustard = Ketchup | Mustard,
    Lettuce = 4,
    Tomato = 8,
    Cheese = 16,
    Pickle = 32,
}
```

In the `BurgerToppings` example we now have seven individual bit flags defined along with a flag that specifies a combination of ketchup and mustard flags. Since enum members are simply named constants backed by their integral numeric value, we could also use `3` instead of `Ketchup | Mustard`. We'll cover a bit more about different ways to set these values in the following sections.

In order for the enum members to be clearly defined and work as expected it is best to explicitly provide the bit values for each member. Without explicitly providing values the enum will implicitly set the value based on enum definition order starting at 0.

The documentation for the Flags attribute is pretty comprehensive and contains solid documentation. I highly recommend checking it out [here](https://learn.microsoft.com/en-us/dotnet/api/system.flagsattribute) to learn more.

## Defining Enum Members and Values

Defining member values with numeric integral type literals
Defining member values with binary literals
Defining member values with bit shifting

### Quick Detour on Bit Shifting

[docs](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/bitwise-and-shift-operators#left-shift-operator-)

## Logical Bitwise Operations

A slightly detailed section on bitwise operations and their utility with flag enums
[docs](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/bitwise-and-shift-operators#logical-and-operator-)
