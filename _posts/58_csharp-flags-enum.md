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

Enum member values can be set in a number of ways and it was actually a personal encounter with one of the ways that led me to writing this post. In my experience I've mostly seen enums, both flag and non-flag, with values defined explicitly as numeric literals (like 0, 1, 2, 3, etc.) which I'll cover first. I'm also going to cover a couple more methods of setting flag enum member values. Flag enum values can also be set using binary literals as well as using the bit shift operator to manipulate values when being set. Each of the examples below will demonstrate a different way of defining flag enum member values. I'll also include a short description to provide any helpful context around each method.

### Using Numeric Type Literals

```csharp
[Flags]
public enum BurgerToppings
{
    None = 0,
    Ketchup = 1,
    Mustard = 2,
    Lettuce = 4,
    Tomato = 8,
    Cheese = 16,
    Pickle = 32
}
```

In my experience using numeric type literals is the most common method of defining enum member values. I would consider this method to be my preferred method. The numeric literals are simple and easy to understand for someone experienced in a codebase as well as for someone just learning their way around.

### Using Binary Literals

```csharp
[Flags]
public enum BurgerToppings
{
    None = 0b_0000_0000,    // 0
    Ketchup = 0b_0000_0001, // 1
    Mustard = 0b_0000_0010, // 2
    Lettuce = 0b_0000_0100, // 4
    Tomato = 0b_0000_1000,  // 8
    Cheese = 0b_0001_0000,  // 16
    Pickle = 0b_0010_0000   // 32
}
```

This method of defining the values on the `BurgerToppings` enum has the same result as the previous, but instead of integers we are using binary literal values. If you're unfamiliar with this syntax, the `0b` prefix is used to denote a binary value. The underscore is referred to as a _digit separator_ and isn't required, but it can be used to improve the readability. In my opinion this method doesn't have any real advantage over using integer literals, so personally I would still opt for the previous method for the readability improvement.

### Using Bit Shift Operator

#### Quick Detour on Bit Shifting

[docs](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/bitwise-and-shift-operators#left-shift-operator-)

## Logical Bitwise Operations

A slightly detailed section on bitwise operations and their utility with flag enums
[docs](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/bitwise-and-shift-operators#logical-and-operator-)
