---
id: 33
slug: typescript-utility-types
title: "Learning TypeScript: Utility Types"
description: One of the things that I've enjoyed the most while learning TypeScript is the language's flexibility when working with types. I think that Utility Types are great examples of that flexibility. In this post, we'll be looking at the main kinds of utility types available and also how we can use them to improve our code.
publishedAt: 2022-03-31T00:27:58.307Z
updatedAt: 2022-03-31T11:25:35.217Z
metadata: learning,typescript,dev
---
## Purpose of Utility Types

Utility types support several common _type transformations_ in TypeScript. When thinking about a type transformation, I think it helps to think about how other developers will utilize a particular type in their code. For example, we may have a type named `BlogPost` that relates to an API response for a request retrieving a blog post.

```typescript
type BlogPost = {
    title: string,
    description: string,
    body: string,
    slug: string,
    createdOn: Date,
    publishedOn: Date,
    tags: string[]
}
```

There may be situations when we want to explicitly indicate what can be done with an existing type. For example, we may want all the properties to be required, read-only, optional, etc. or maybe we'd like to exclude or include only certain properties from a type. This can all be done at the type level with utility types. Before jumping into examples, I'd like to mention that there are many different kinds of utility types and this post is not an exhaustive list. If you'd like to check out the full list, head over to the documentation [here](https://www.typescriptlang.org/docs/handbook/utility-types.html).

For this blog post, I've decided to cover the utility types that I believe to be more common but definitely would recommend reading the full list in the documentation for awareness.

### `Partial<Type>`

When we create types in TypeScript the expectation is that all of the properties within the type are required to fulfill the type's contract. We can define individual properties within a type as being optional using the `?` operator. For example with our previous `BlogPost` type if we want the `tags` property to be optional it would look like this `tags?: string[]`

With the partial utility type, we are able to specify that all of the properties within a type are optional regardless of any existing optional `?` operators. This is useful when we want to transform the properties of an existing type to be optional for cases when we don't need or don't have values for every property within a type. Let's take a look at an example.

```typescript
function savePostDetails(post: Partial<BlogPost>) { }

const postDetails: Partial<BlogPost> = {
    title: "Hello World",
    slug: "hello-world",
    tags: [ "intro", "dev" ]
}

savePostDetails(postDetails);
```

### `Required<Type>`

The required utility type is the exact opposite of `Partial<Type>`, which means that using `Required<Type>` will make all of the properties for the specified Type required. You may be wondering "*How is this different from a regular type?*". The difference is that using the required utility type will even make optional properties (defined with `?`) required. Using `Partial<Type>` makes all properties optional and `Required<Type>` makes all properties required. Let's look at another example in which the return statement causes a compiler error because even the optional properties on `BlogPost` need to be defined when dealing with `Required<BlogPost`.

```typescript
type BlogPost = {
    title: string,
    description?: string,
    body: string,
    slug: string,
    createdOn: Date,
    publishedOn?: Date,
    tags?: string[]
}

function getPublishedPosts(): Required<BlogPost>[] {
  // Will not compile
  // description, publishedOn, and tags are required
    return [ {
        title: "Hello-World",
        body: "The end.",
        slug: "hello-world",
        createdOn: new Date()
    }];
} 
```

### `Readonly<Type>`

In TypeScript, we have the ability to set properties on a type as read-only using the `readonly` keyword like `type Test = { readonly prop1: string }`. This feature is useful when we want to make sure that a property can't be re-written once set. This can come in handy when we are authoring the type and its properties, but what if we are working with a pre-existing type and want all of the type's properties to be read-only? In that case, we can use `Readonly<Type>`, which will make all properties in the specified Type "read-only" (not necessarily immutability, but can't be re-written once set). Let's look at this in action.

```typescript
// The title property can't be changed because all properties are read-only
function formatBlogPost(post: Readonly<BlogPost>) {
    post.title = "Can't do this";
}
```

These next two utility types are similar to `Partial<Type>` and `Required<Type>` in that they are opposites of each other. 

### `Pick<Type>`

The pick utility type allows us to single out a property or union of properties in a type to be included in the resulting type. So let's say we wanted to create a type from our `BlogPost` type that only had `title`, `description`, and `body` properties. We can do that with `Pick<BlogPost>`. Here's an example.

```typescript
type BlogPreview = Pick<BlogPost, "title" | "description" | "body">;

function getPostPreviews(): BlogPreview[] {
    return [{
        title: "Hello World",
        description: "test",
        body: "The end."
    }];
}
```

The example above specified multiple properties to pick from `BlogPost` with a union of string literals, but we could also just specify a single property with a string literal like `"title"`.

### `Omit<Type>`

The omit utility type is the opposite of pick in that it allows us to specify a property or union of properties to be omitted from the resulting type. Having gone through the syntax and functionality of `Pick<Type>` I don't think you'll be surprised to learn that `Omit<Type>` is the same. Let's look at a quick example.

```typescript
type BlogPreview = Omit<BlogPost, "slug" | "createdOn" | "publishedOn" | "tags">;

function getPostPreviews(): BlogPreview[] {
    return [{
        title: "Hello World",
        description: "test",
        body: "The end."
    }];
}
```

Overall I think that utility types are awesome for allowing developers to clearly express intent in their code. With utility types, a developer can indicate how inputs and outputs should be handled, which makes the expectations for consumers of that code very clear.