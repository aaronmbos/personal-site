---
id: 32
slug: typescript-literal-types
title: "Learning TypeScript: Literal Types"
description: In this post, we'll be looking at literal types, what they are, and how we can potentially use them in our code day to day. Coming from a language like C# where there isn't really an equivalent to literal types I find them to be quite interesting and I hope you will too. Let's dive in!

publishedAt: 2022-03-19T13:38:44.329Z
updatedAt: 2022-03-28T02:14:03.900Z
metadata: learning,typescript,dev
---
## What are Literal Types?

Initially when I saw the term "literal" in 'literal type' my mind immediately went to **literal values**, which is a feature in almost every programming language (ie `const literalString = "I'm a string literal"`). However, once I started to read into and learn about **literal types** I realized my initial assumptions were incorrect.

Literal types do not refer to actual values, but to a **type** like string, number, object, or a user-defined interface/type alias. The interesting and kind of confusing piece of this is that a literal type is a **type** referencing a specific value (or values as we'll see later). We'll get into the different kinds of literal types in a minute, but first, let's look at a quick example of a string literal type being used with a function parameter.

```typescript
function evaluateReaderHappiness(level: "Happy") { }

// Results in Argument of type '"So Happy"' is not assignable to parameter of type '"Happy"'.
evaluateReaderHappiness("So Happy");
```

While this example may seem simple and slightly contrived, it shows that we can define a string literal type for the `level` function parameter that only allows the string value of `"Happy"` to be passed as an argument to the function. This provides a level of type safety that can help callers make sure they are providing valid arguments to functions at compile time instead of failing runtime validation or exceptions occurring. We've touched on string literal types here briefly, but in the next section, we'll take a closer look at the different kinds of literal types available.

### Kinds of Literal Types

As we've seen in the previous example snippet, literal types can be defined as a specific **string** value or values. Literal types are similar to any other type definition in TypeScript in terms of how they can be constructed and used. One of the more useful scenarios for literal types is when multiple values are provided in the type via union type. Let's expand on our previous example by introducing a union type with multiple string literal types.

```typescript
type HappinessLevel = "Sad" | "OK" | "Happy" | "Ecstatic";

function evaluateReaderHappiness(level: HappinessLevel) { }

const happyLevel = "Ecstatic";

// Will not compile unless `happyLevel` has a value within the union of values in HappinessLevel type
evaluateReaderHappiness(happyLevel);
```

In my opinion, this concept is really powerful because it eliminates a portion of bugs that could happen at runtime if a consumer passes a value that the function isn't able to handle properly. Obviously literal types won't save the day in every scenario, but I think they are a useful tool in the TypeScript toolbelt. I could see string literal types coming in handy when defining a method that handles HTTP requests to define standard response status code names (like Unauthorized or Not Found).

There are two other kinds of literal types that we'll touch on briefly. We don't need to go too in-depth on these because they are functionally the same as string literal types except the underlying integral type is different.

First up is the number literal type and as you may expect it is the exact same as the string representation except using numbers. Let's look at a quick example.

```typescript
type HappinessScore = -5 | 0 | 5 | 10;

function gradeReaderHappiness(score: HappinessScore) { }

const happyScore = 5;

// Will not compile unless `happyScore` has a value within the union of values in HappinessScore type
gradeReaderHappiness(happyScore);
```
The final kind of literal type is the boolean literal type and you won't be surprised to hear that it acts exactly the same as the string and number literal types. The only valid values for boolean literal types are `true` and `false`. I'll forego the example here because I think they're very similar to the previous examples with a much smaller range of possible values.

Now that we've gone through the basic kinds and use cases for literal types. Let's take a look at some of the cool things that they allow the compiler to do that make our lives easier.

## Literal Type Inference 

I believe one of the big advantages of using a statically typed language like TypeScript is the amount of confidence a developer can get from having a compiler evaluating code as they are writing it. This confidence doesn't have to come from explicitly defining every type annotation in the code. Instead, the compiler is smart enough to be able to **infer** expected types and values as the code is written. I mentioned previously that literal types allow for additional safety when dealing with literal values, but there are some tricky bits that make them slightly more challenging to work with.

Let's continue to build on our previous examples of a fictitious reader happiness evaluator. We may want to define a function that accepts a `HappinessLevel` and a `HappinessScore` to do more evaluation.

```typescript
type HappinessLevel = "Sad" | "OK" | "Happy" | "Ecstatic";
type HappinessScore = -5 | 0 | 5 | 10;

function evaluateReaderRating(score: HappinessScore, level: HappinessLevel)
{
    // do evaluations
}
```

What if we defined an object that has the appropriate literal values to be sent to `evaluateReaderRating`, would that work?

```typescript
const readerInput = { score: 5, level: "Happy" };

// Will not compile because readerInput.score or readerInput.level *could* change
// Therefore they do not meet requirements of the literal types
evaluateReaderRating(readerInput.score, readerInput.level);
```

Well if that won't work, how can we pass object properties that are literal values as literal types? We have a couple of options.

The first option is to define the object fields as constants themselves with `as const`.

```typescript
const readerInput = { score: 5, level: "Happy" } as const;

// This works
evaluateReaderRating(readerInput.score, readerInput.level);
```

Another option is to explicitly define the literal types when creating our `readerInput` variable, again with the `as` keyword.

```typescript
type ReaderInput = {
    score: HappinessScore,
    level: HappinessLevel
}

const readerInput : ReaderInput = { score: 5, level: "Happy" };

// This works too!
evaluateReaderRating(readerInput.score, readerInput.level);
```

As you can see we do have to do a little bit more work when using literal types in certain scenarios, but I think that they are a great feature when used in the right moments. If you'd like to play around with any of the example code that we've gone through check out this link to the TS playground [here](https://www.typescriptlang.org/play?#code/C4TwDgpgBAEghmMBLAdhAzugMhAbhAGygF4oAiAZTgBMyoAfcgeQGk7Gz5ER3yBRAMbpgcYEgFkA3AFgAUKEiwEyNJgoCA9gCdopALQBWBlAAMxo4wCMJmbLkAzAK4oBYjSih44BR6IgAlCBoILX9RVABzAAp0TR0ALiVEVAx0dW0IABooAjxCRK4VVJx8AgBKKDkAb0rZKHqoAHpGqGoNT1xvXzcUdDkAXzk5TV7gKB1grQBJFDBHMdIa2IzEozh0JKK1OKycvIJEzmUeKHXNlMwSwih+2zkvHz9AybCxFGiJ6hCZueAAOmWOmyn2+s3mf1ypTKtiAA).
