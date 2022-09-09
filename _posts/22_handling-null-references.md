---
id: 22
slug: handling-null-references
title: "Working With Null in C#"
description: As software developers, we are bound to encounter scenarios where our code behaves in unexpected ways. Some of those unexpected behaviors could be caused by null object references. In this post, we're going to take a look at the different language constructs that C# provides for working with null. My goal is to provide information that leads to more tidy code and fewer bugs.
publishedAt: 2021-11-30T02:35:19.549Z
updatedAt: 2021-11-30T02:35:19.575Z
metadata: dev,learning,dotnet,csharp
---
## Null Basics in C#

Before we get too deep into handling null in our code, let's touch on the basics of null in C#. First, we use the `null` keyword to represent a null reference (a reference that doesn't refer to any object). A bit later in this post, we'll touch on how null comes into play with different C# types.

```
string nullRef = null;
```

One of the main reasons why null can be difficult to work with is the `NullReferenceException`. This exception is thrown when our code tries to access a member of an object whose value is `null`. Often times null reference exceptions will occur unexpectedly and *can* indicate a bug in our code. For example, if we expand on our previous code snippet we'll see a `System.NullReferenceException` when trying to access the `Length` property on `nullRef`.

```
string nullRef = null;
Console.WriteLine(nullRef.Length);
```

More often than not null reference exceptions will occur when a method returns null or an object is never instantiated. Null reference exceptions can be very frustrating when they occur unexpectedly, luckily C# has a lot of functionality built into the language that can help us steer clear of these null reference scenarios. The first language feature that we're going to look at is "Nullable Reference Types".

## Nullable Reference Types

"[Nullable Reference Types](https://docs.microsoft.com/en-us/dotnet/csharp/nullable-references)" is a feature that was added to C# in version 8.0, but has not been enabled in the language by default *until the release of .NET 6*. If using a version of .NET prior to .NET 6 (and still using a language version >= 8.0), nullable reference types will have to be enabled explicitly. The goal of nullable reference types is to minimize the occurrence of null reference exceptions. Let's take a closer look at this feature to see how we can leverage it in our code.

As mentioned previously, nullable reference types are not enabled by default in versions of .NET before .NET 6. There are a few ways to enable the feature which can impact different scopes of our applications. The first option to enable nullable reference types is in the `.csproj` file and impacts the entire project. Including the line below in the project file will enable nullable reference types for the entire project.

```
<Nullable>enable</Nullable>
```

If enabling nullable reference types for the entire project is not possible or ideal, then we can enable the feature using "directives" that are scoped to specific areas of the code. The directive to use is `#nullable` combined with an option like `enable`, `disable`, etc. For more information about the use of directives to control nullable reference types, check out the docs [here](https://docs.microsoft.com/en-us/dotnet/csharp/nullable-references#nullable-contexts). Now that we know how to enable nullable reference types in our code, let's see how they work and what they can do for us.

Before C# 8.0 and nullable reference types, all reference types were *nullable*. The introduction of nullable reference types provides some additional compile-time code analysis along with annotations to explicitly indicate the purpose behind our code. While using nullable reference types we are provided with null-state analysis, which analyzes our code to indicate whether an object reference may or may not be null. The null-state analysis emits warnings to indicate that dereferencing an object (aka accessing an object member) may result in a `NullReferenceException`. The null-state analysis is able to determine that an object reference **is not** null OR **maybe** null based on our code. When a variable is in a **maybe null** state, then the compiler will emit a warning to indicate that we should check for null before dereferencing the object.

A couple of examples of the warnings we may see after enabling nullable reference types are:

```
Possible null reference argument for parameter <parameterName>
Cannot convert null literal to non-nullable reference type.
```

So far we discussed how the compiler analyzes our code to determine whether or not a `NullReferenceException` is possible based on null-state analysis. Let's take a look at the variable annotations that we can use to indicate to the compiler that a value **can** be null and mitigate those error messages.

In order to indicate that a particular variable or class member can be null a `?` is appended to the end of the type declaration. As mentioned previously, enabling nullable reference types basically means that we are assuming that any reference types in our code should **never** be null. The `?` suffix on the type declaration explicitly indicates that a reference for this object **may be null**.

```
// Examples of nullable reference types
string regularString = "I'm a regular string";
string? nullableString = "I'm a nullable reference type";
StringBuilder? nullableStingBuilder = "I'm a nullable reference type too";
```

It is important to note that appending the `?` to the reference type declarations is not the same as the `System.Nullable<T>` value types. Declaring a null reference type of `string?` is still using the same underlying type of String, whereas declaring `int?` is declared using `Nullable<int>` versus the value type of `int`. I like to think of nullable reference types as more of a feature of the compiler, while nullable value types are built into the actual runtime.

When we know a reference is not null, but the compiler still emits a warning we can use the "null-forgiving operator" `!` to override the warning. This feature should be used only when needed because when using nullable reference types, the goal is for the compiler to help us by indicating when a `NullReferenceException` is possible.

```
// Using null-forgiving operator to silence compiler warning
btn!.Click();
```

Nullable reference types are a pretty new feature in C# and may not be widely used at this point, but I really think enabling the feature can improve the quality of our code in many different ways. Next, we'll take a look at operators that will help when assigning values that may be null.

## Null-Coalescing and Variable Assignment

In this section, we'll be talking about a couple of operators that help with null checking and value assignment. First, we'll be looking at the null-coalescing operator which was initially introduced in C# 6. The null-coalescing operator is defined by using `??` characters between operands like `a ?? b`. The purpose of this operator is to return the value of the left operand if it does **not** evaluate to null. If the left side is null, then the right side of `??` will be evaluated. This operator is very useful for avoiding ternary operators that check for null or for throwing an exception when a value evaluates to null.

```
// throwing an exception
records.FirstOrDefault() ?? throw new Exception("FirstOrDefault returned null");

// null-coalescing operator
var test = x ?? default;

// ternary operator
var test = x == null ? x : default;
```

Starting with C# 8 the only constraint on the left operand of the null-coalescing operator is that it cannot be a non-nullable value type. Previously the left side of `??` was constrained to a reference type or nullable value type.

Let's take the null-coalescing a bit further by looking at the null-coalescing assignment operator `??=`, which was introduced in C# 8. This operator assigns the value of the right operand **only** if the left operand evaluates to null. Where this may be useful in our code is when we have null checks that assign a variable if it is null.

```
if (x == null)
{
  x = y;
}

// Replace above with the null-coalescing assignment
x ??= y;
```

Both of these null-coalescing features can help tidy up our code and remove explicit null conditions. We have one more feature that can be used in conjunction with null-coalescing operators that will make our lives even easier when dealing with null references.

## Null-conditional Operators

The null-coalescing operators were useful for providing a "fallback" so to speak when one side of the operator was evaluated to null. Null-conditional operators also provide some safety in the event of a null operand but will return `null` if the left side of the operator evaluates to null. There are two null-conditional operators that apply to two operations, member access and element access. The member access operation is defined by `?.` and is used when accessing object members (properties, methods, fields, etc.). The element access operation is defined by `?[]` and is used when accessing elements of a collection that support access by index.

```
records?.FirstOrDefault();
password?.Length;
records?[0].Name;
```

In the examples above if `records` or `password` evaluate to null then the entire expression will evaluate to null and operations to the right of the `?` will not be evaluated. The nice thing about the null-conditional operations is that they short-circuit. So the first access operation evaluating to null will short circuit the expression and subsequent operations will not be evaluated. The example with `records?[0].Name` showcases the short circuit behavior. If `records` is `null`, then the access of the `Name` property will not be evaluated.

I mentioned that the null-conditional operators play well with the null-coalescing operators. The null-conditional operators provide safety around accessing members or elements when null is a possibility. The null-coalescing operator can provide a fallback value if the null-conditional short circuits.

```
// the null-coalescing right operand will only evaluate if the null-conditional short circuits
var name = records?[0].Name ?? "Unknown";
```

In this post, we've discussed a handful of features provided by C# that make dealing with null a bit easier. Be sure to stay up to date with language versions and features as C# is an ever-evolving language and many of these features have been introduced within the last few releases.

### Resources

[Nullable Reference Types](https://docs.microsoft.com/en-us/dotnet/csharp/nullable-references)

[Null-coalescing Operators](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/operators/null-coalescing-operator)

[Null-conditional Operators](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/operators/member-access-operators#null-conditional-operators--and-)
