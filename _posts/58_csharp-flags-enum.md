---
id: 58
slug: csharp-flags-enum
title: "Defining and Using Enums as Bit Flags in C#"
description: "I've been using enums in C# since the beginning of my development career. In this post, we are going to dive into how the Flags attribute can be applied to enums and also the different kinds of operations that come into play when an enum is defined as a bit flag. Let's dive in!"
publishedAt: YYYY-MM-DDTHH:MM:SS.000Z
updatedAt: YYYY-MM-DDTHH:MM:SS.000Z
metadata: csharp,dotnet,dev,fundamentals
---

I've been using enumerations (enums) in C# since my earliest days learning the language. In that time I've seen them used for many purposes, some fitting and some not so fitting. I've found that one of the more common use cases for enums is for them to be treated as bit flags. If you're not familiar with the concept of bit flags, don't worry I'll cover that in this post along with some additional information surrounding bit flag enums. I'll be the first to admit that using enums as bit flags can be a bit confusing, but their ability to represent combinations of values with a single named constant can be useful in several scenarios.

## Using the Flags Attribute

The first step to defining an enum as a bit flag is to add the `Flags` attribute to the enum type. In practice, this looks like the example below. It is a common [convention](https://learn.microsoft.com/en-us/dotnet/standard/design-guidelines/names-of-classes-structs-and-interfaces#naming-enumerations) in .NET to use a plural name for enums that are defined as flags.

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

In the `BurgerToppings` example, we now have seven individual bit flags defined along with a flag that specifies a combination of ketchup and mustard flags. Since enum members are simply named constants backed by their integral numeric value, we could also use `3` instead of `Ketchup | Mustard`. We'll cover a bit more about different ways to set these values in the following sections.

For the enum members to be clearly defined and work as expected it is best to explicitly provide the bit values for each member. Without explicitly providing values the enum will implicitly set the value based on the enum definition order starting at 0.

The documentation for the Flags attribute is pretty comprehensive and contains solid documentation. I highly recommend checking it out [here](https://learn.microsoft.com/en-us/dotnet/api/system.flagsattribute) to learn more.

## Defining Enum Members and Values

Enum member values can be set in many ways and it was a personal encounter with one of the ways that led me to write this post. In my experience, I've mostly seen enums, both flag and non-flag, with values defined explicitly as numeric literals (like 0, 1, 2, 3, etc.) which I'll cover first. I'm also going to cover a couple more methods of setting flag enum member values. Flag enum values can also be set using binary literals as well as using the bit shift operator to manipulate values when being set. Each of the examples below will demonstrate a different way of defining flag enum member values. I'll also include a short description to provide additional context around each method.

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

This method of defining the values on the `BurgerToppings` enum has the same result as the previous one, but instead of integers, we are using binary literal values. If you're unfamiliar with this syntax, the `0b` prefix is used to denote a binary value. The underscore is referred to as a _digit separator_ and isn't required, but it can be used to improve readability. In my opinion, this method doesn't have any real advantage over using integer literals, so I would still opt for the previous method for the readability improvement.

### Using Bit Shift Operator

```csharp
[Flags]
public enum BurgerToppings
{
    None = 0,
    Ketchup = 1,
    Mustard = 1 << 1,
    Lettuce = 1 << 2,
    Tomato = 1 << 3,
    Cheese = 1 << 4,
    Pickle = 1 << 5
}
```

In this example, we use the left-shift operator to set the value of each enum member. The value of each member is the same as in the previous two examples. The left-shift operator `x << count` will shift the value `x` left the number of bits defined by `count`. Let's take `Lettuce = 1 << 2` as an example. I find it helpful to think about these values as powers of two. So when we shift the value 1 left 2 bits we can think of this as `2^2`. Let `1 << 3` can be thought of as `2^3` and that pattern continues for each member in the enum.

I also find it helpful to visualize the shifting by thinking about binary literals. So we start with the value 1 as `0001` and we need to shift it left 2 bits, which results in `0100` or 4. Bit shifting is a very interesting topic that has many use cases beyond flag enums. There is a relatively famous "fast inverse square root" from the Quake III source code that utilizes bit shifting in a very clever manner. Below is the snippet with the original comments.

```c
float Q_rsqrt( float number )
{
	long i;
	float x2, y;
	const float threehalfs = 1.5F;

	x2 = number * 0.5F;
	y  = number;
	i  = * ( long * ) &y;                       // evil floating point bit level hacking
	i  = 0x5f3759df - ( i >> 1 );               // what the fuck?
	y  = * ( float * ) &i;
	y  = y * ( threehalfs - ( x2 * y * y ) );   // 1st iteration
//	y  = y * ( threehalfs - ( x2 * y * y ) );   // 2nd iteration, this can be removed

	return y;
}
```

While this method of defining enum member values is effective and is synonymous with the previous examples, I find it a little less intuitive than using integer or binary literals.

## Logical Bitwise Operations

Earlier in this post, I briefly mentioned that flag enums can represent a combination of members using a single value. This functionality is made possible by using logical bitwise operations. The bitwise operations that we are going to be concerned with are the logical AND `&` and OR `|` operations because they are commonly used with flag enums. There are other operations like exclusive OR and bitwise complement, but in my experience, they are used much less frequently with flag enums.

I've already mentioned the logical OR operation in the first example when I listed `KetchupAndMustard = Ketchup | Mustard` so we'll start with that. The logical OR operation will return `true` if either of its operands is true. So when thinking about this in the context of flag enums `BurgerToppings.Ketchup` has a value of 1 or `0001` and `BurgerToppings.Mustard` has a value of 2 or `0010`. When we perform a logical OR on these two values we end up with 3 or `0011`. This can be particularly useful if you want to combine multiple enum values as a single value.

```shell
0001
 OR
0010
----
0011
```

The other operation that we will cover is the logical AND which returns true when **both** of its operands return true. I think that the logical AND is most useful with flag enums for determining if a value is contained in a combination of enum values. Let's expand our example of burger toppings and say that we track the toppings that each customer orders as a bitwise flag. One day our manager says that we need to start cutting costs and need to know how many orders include Ketchup. This problem is made easy with the logical AND operator. Let's take a single order as an example (this could be applied to any order that was placed) where the customer ordered Ketchup, Mustard, Lettuce, and Tomato.

```csharp
var orderToppings = BurgerToppings.Ketchup |
    BurgerToppings.Mustard |
    BurgerToppings.Lettuce |
    BurgerToppings.Tomato;
```

We can use `BurgerToppings.Ketchup` as the left operand of the logical AND to determine if Ketchup was in this order. If the result is true, then it should return `BurgerToppings.Ketchup` (it does).

```csharp
var orderToppings = BurgerToppings.Ketchup |
    BurgerToppings.Mustard |
    BurgerToppings.Lettuce |
    BurgerToppings.Tomato;

// Writes Ketchup
Console.WriteLine(BurgerToppings.Ketchup & orderToppings);
```

If we look at the logical AND from the perspective of raw values, `orderToppings` has a value of 15 or `1111` and Ketchup has a value of 1 or `0010`. When the logical AND operation is applied to these values the result is 1.

```shell
0010
AND
1111
----
0010
```

Flag enums have come up quite frequently in my career thus far for a multitude of reasons. They can be a powerful tool when used for the right problems. I hope this post provides a bit of insight into how they can be used effectively in day-to-day work.
