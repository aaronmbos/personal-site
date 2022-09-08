---
id: 29
slug: typescript-conditional-types
title: "Learning TypeScript: Conditional Types"
description: Conditional Types in TypeScript may not be a language feature used day to day by most developers, but as I was reading the TypeScript Handbook I found the concept interesting and decided to dig a little deeper. In this post, we'll take a high-level look at the concept of conditional types and how they can be leveraged in our code.
publishedAt: 2022-02-19T12:40:17.609Z
updatedAt: 2022-02-19T12:56:24.230Z
metadata: dev,learning,typescript
---
## What Are Conditional Types?

Conditional types act as "`if` statements" for the type system and help describe the relationship between the types of inputs and outputs. Conditional types are most commonly used to reduce the number of options in a type union. Let's break this definition down by first looking at how these "`if` statements" inside the type system are constructed. Based on the name you may not be surprised that the syntax for conditional types in TypeScript is very similar to the syntax for the conditional operator in JavaScript.

```
// JavaScript's conditional operator
expression ? "truthy" : "falsy";

// TypeScript's conditional type
A extends B ? C : D
```

In the TypeScript example, `B` is an expression whose result determines what type `A` should extend. This is the basic `if` statement part of the definition. Let's take a closer look at the second part of the definition _"describe the relationship between the types of inputs and outputs"_. The expression in the conditional is responsible for the input types and the truthy or falsy result is responsible for the output types.

When thinking about inputs and outputs as they relate to conditional types, they are most often used when dealing with generics. As usual, this concept may be best explained when starting with an example code snippet. In the example below we can imagine a potential API response type that expects a field of `isSuccess` on the generic type, but when the generic is
used with a type that doesn't have that field the assumed output is `never`.

```
type Response<T> = T extends { isSuccess: boolean } ? T : never;
```

The concept of conditional types also applies to methods as well. The syntax is exactly the same as when used on a type and we place the condition on the return type of the method. If we continue to use a similar example to the one above, but instead have a method that could handle an API response it may look something like this.

```
declare function handleResponse<T extends { isSuccess: boolean }>(response: T) : T extends { isSuccess: boolean } ? T : never;

// TS compiler will know that the return type is T here
let responseOfT = handleResponse({ isSuccess: true });

// TS compiler will know that the return type is never
let responseOfNever = handleResponse("An error occurred");
```

As I mentioned earlier in this post conditional types may not be used day to day in our code, but it's an interesting topic that I wanted to understand a little bit more. I did my best to apply the concept to a potential real-world scenario since I felt the TypeScript documentation provided examples that were a little contrived in some cases.

### Resources

[TypeScript Cheat Sheets](https://www.typescriptlang.org/cheatsheets)

[TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)

[TypeScript Playground](https://www.typescriptlang.org/play#example/conditional-types)