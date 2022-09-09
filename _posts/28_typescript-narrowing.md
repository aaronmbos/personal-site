---
id: 28
slug: typescript-narrowing
title: "Learning TypeScript: Narrowing Types"
description: Often times the TypeScript compiler knows more about our own code than we do. However, there are occasions when that's not the case, which is where type narrowing comes in. In this post, we'll take a look at the different options available for narrowing types in our TypeScript code.
publishedAt: 2022-02-11T04:41:30.707Z
updatedAt: 2022-02-11T04:58:24.616Z
metadata: web,learning,typescript,dev
---
## What is Type Narrowing?

Before we take a look at available options for narrowing types in TypeScript, let's take a moment to understand exactly what "narrowing" means and why it matters. First, TypeScript is a language that provides static type checking on top of JavaScript. TypeScript aims to provide this type safety while not compromising the features of JavaScript that make it what it is. In other words we shouldn't really have to fundamentally change the way that we write JavaScript in order to write type-safe TypeScript.

The TypeScript compiler does a great job of providing helpful messages and errors as we write our code, but sometimes we need to give the compiler a little more context for it to allow us to write certain code. This is where type narrowing is helpful because we are able to tell the compiler which type we are expecting in a given context. The neat thing about this is that TypeScript also analyzes our control flow code like `if/else`, `ternary operators`, `switch statements`, etc., which makes it very easy to safely narrow types and avoid compiler warnings/errors.

Below is the bit of example code that we'll be working with for the remainder of this post.

```typescript
interface Post {
  author: string;
  title: string;
  body: string;
  slug: string;
}

export async function getAllPosts() : Promise<Post[] | string | undefined> {
  // Do some stuff to request blog posts
}

export async function getPostByUrlId(urlId : string) : Promise<Post | undefined> {
  const posts = await getAllPosts();
  const post = posts.find((post) => post.slug === urlId);

  return {
    ...post,
  };
}
```

Without any changes the code above will result in a couple compiler errors when calling `posts.find()` in `getPostUrlId` indicating that `find` doesn't exist on type `string | Post[]` and `posts` may be undefined. Let's look at how narrowing can fix these issues.

![ts-error.png](https://res.cloudinary.com/aaron-bos/image/upload/v1644555350/ts_error_0b1c0d0a57.png)

## Narrowing With Type Guards

The first option for type narrowing is the use of "type guards". Using the `typeof` operator is used commonly in JavaScript and it can be used in TypeScript to narrow types and give the compiler information as to what type is expected in certain branches of code. Performing narrowing with a type guard is as simple as introducing an `if` condition using the `typeof` operator. Using our example from above a type guard looks like this.

```typescript
export async function getPostByUrlId(urlId : string) : Promise<Post> {
  const posts = await getAllPosts();
  // With type guard TS can be confident we are working with Post[]
  if (typeof posts !== "string")
    return posts.find((post) => post.slug === urlId);

  throw new Error(`No post found with id ${urlId}`);
}
```

Using the type guard above will resolve the error indicating that `find` does not exist on the `string` type. You'll notice that an error still exists from `posts` potentially being undefined. We'll fix that in our next section.

## Truthiness Narrowing

Truthiness is a concept that should be relatively familiar to most JavaScript developers, but for clarity we'll go through the basics quick. In many cases truthiness comes into play when an `if` condition is used with a value that isn't a boolean. The non-boolean value is coerced into a boolean based on what JavaScript deems to be truthy or falsey for that type. For example, `0, NaN, "", 0n, null, undefined` all get coerced to false. Often times we'll see `&&, ||, !` used to check truthiness.

In TypeScript we can use this boolean coercion functionality to narrow our types and help out the compiler. To continue using our previous example we'll introduce narrowing via truthiness to get rid of the potentially undefined compiler error with the `posts` variable.

```typescript
export async function getPostByUrlId(urlId : string) : Promise<Post | undefined> {
  const posts = await getAllPosts();
  // Testing the truthiness of posts makes sure its not undefined
  if (posts && typeof posts !== "string")
    return posts.find((post) => post.slug === urlId);

  throw new Error(`No post found with id ${urlId}`);
}
```

We should now see no errors in the `getPostByUrlId` function with both type guard and truthiness narrowing in place.

## Equality Narrowing

Equality narrowing in TypeScript takes advantage of the standard comparison operators like `===, !==, ==, !=` and `switch` statements in order to provide type correctness in branches of code. This kind of narrowing is pretty similar to the kinds we've discussed so far. Let's take another look at our example code, but in a different light. For this example, let's assume that we want to perform different actions based on the value of the `posts` variable which is the result of `getAllPosts()` that returns `Post[] | string | undefined`.

```typescript
export async function getPostByUrlId(urlId : string) : Promise<Post | undefined> {
  const posts = await getAllPosts();

  if (posts === undefined) {
    console.log('getAllPosts returned undefined');
  } else if (typeof posts === "string") {
    // All methods availabe to string types are fair game in this branch
    console.log(posts.toLowerCase());
  } else {
    // At this point the compiler knows posts is Post[]
    return posts.find((post) => post.slug === urlId);
  }

  throw new Error(`No post found with id ${urlId}`);
}
```

Like I mentioned previously, equality narrowing is pretty similar to the kinds of narrowing already discussed. The key thing to remember is that with type narrowing we are able to call methods and access properties in a type safe manner, which can really benefit our code in the long run.

## `in` Operator Narrowing

The `in` operator in JavaScript is used to determine if a specified property is in an object or its prototype chain. In TypeScript the `in` operator has the same effect, but with some added benefits. Like JavaScript it will return `true` if a specified value is a property (optional OR required) of a specified object. The `in` operator in TypeScript also allows the compiler to perform type narrowing for code branches as we've seen previously. Let's continue using the same example function to demonstrate.

```typescript
interface Post {
  author: string;
  title: string;
  body: string;
  slug: string;
}

export async function getAllPosts() : Promise<Post[] | string | undefined> {
  // Do some stuff to request blog posts
}

export async function getPostByUrlId(urlId : string) : Promise<Post | undefined> {
  const posts = await getAllPosts();

  if (posts === undefined) {
    console.log('getAllPosts returned undefined');
  } else if (typeof posts === "string") {
    // All methods availabe to string types are fair game in this branch
    console.log(posts.toLowerCase());
  } else if ("find" in posts) {
    // Use the in operator to know that posts is an Array
    return posts.find((post) => post.slug === urlId);
  }

  throw new Error(`No post found with id ${urlId}`);
}
```

The example above uses the `in` operator to determine if the posts variable contains a `find` property. This example may be a little contrived and unnecessary, but it still demonstrates how `in` can be used to narrow types. 

## `instanceof` Narrowing

The final type of narrowing that we'll discuss uses the `instanceof` operator. The `instanceof` operator returns a boolean based on whether or not the prototype property of a constructor appears in the prototype chain of an object. While the definition of `instanceof` may be a little confusing, the actual use of it with type narrowing is relatively straightforward and similar to previous examples.

This next example will use the `getPostByUrlId` function which returns `Promise<Post | undefined>` in order to demonstrate how `instanceof` is used for narrowing types. For the purpose the example we needed to update the `Post` interface to be a class.

```typescript
class Post {
  author: string;
  title: string;
  body: string;
  slug: string;
  published_at: string;

  constructor() {
    this.author = "";
    this.title = "";
    this.body = "";
    this.slug = "";
    this.published_at = "";
  }
}

export async function buildPostContent(id : string) : Promise<Post | undefined> {
  const post = await getPostByUrlId(id);

  if (post instanceof Post)
     return post;
  else {
    console.log(post)
  }
}
```

In this example, if the post variable is an instance of the `Post` class, the post will be returned. The screenshot below shows that the compiler knows that `post` is undefined in the `else` block.

![ts-instanceof-narrow.png](https://res.cloudinary.com/aaron-bos/image/upload/v1644555350/ts_instanceof_narrow_19f9da8f7e.png)

In this post we've reviewed the different ways that type narrowing can happen in TypeScript. As I continue to learn more about TypeScript and the features it provides on top of JavaScript, I find it very interesting and nice to work with. This is the first of what I hope will be many blog posts about TypeScript as I really dive in and learn during the next few months!
