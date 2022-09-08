---
id: 40
slug: merge-objects-typescript-javascript
title: "Merging Objects in TypeScript (and JavaScript)"
description: Merging two objects seems like it should be a trivial problem to solve at face value. Unfortunately, as we'll see in this post, the problem isn't as straightforward as some may think. In this post, we'll be looking at the options available for merging objects in TypeScript (the options discussed will work just as well with JavaScript).
publishedAt: 2022-06-12T00:02:31.485Z
updatedAt: 2022-06-12T00:21:43.623Z
metadata: javascript,typescript,learning
---
## Types Of Merges

There are two main methods for merging objects, which are **shallow** and **deep**. While this post is focused on the functionality in TypeScript and JavaScript, you'll find similar concepts in many other languages. When merging objects there is typically a target object and one or many source objects that are applied to the target object. The behavior of the merge depends on the type of merge operation being performed.

As we think about merging two objects together it's important to think about the expected outcome for a given scenario. The expected outcome will help guide our decision on which kind of merge should be used. The next sections will touch on details for each type of merge as well as methods to use them in code.

The examples in this post are going to be based on the concept of merging objects representing HTTP requests. There may be scenarios where we have a base request configuration that is used for most requests but can also override properties when necessary. We can use different merge methods to accomplish this.

If you'd like to follow along with the examples interactively check out this [link](https://stackblitz.com/edit/typescript-rmo7vz?devToolsHeight=33&file=index.ts) to a StackBlitz project.

```typescript
interface HttpRequest {
  baseUrl: string;
  url?: string;
  method?: "GET" | "POST";
  headers?: { [key: string]: string };
}
```

### Shallow Merge

Shallow merging of objects is the most common and least complex version of merging objects. The reason for this being is that shallow merging pertains to simply copying property values from one or many objects to another. If a property is a reference type like an object or array, then the reference will be copied instead of creating entirely new objects. The two most common methods of shallow merging in TS and JS are `Object.assign()` and using the `...` spread syntax.

#### Object.assign()

The `Object.assign` method copies all enumerable (`propertyIsEnumerable(prop)` returns `true`) own properties from one or many source objects to a target object. The source object(s) properties are applied to the target object, which is then returned from the method after it has been modified. Since `Object.assign` performs a shallow merge operation, only properties one level deep will be "merged". Any properties deeper than the first level will simply be copied as part of their parent.

```typescript
Object.assign(target, ...sources);
```

Let's take a look at `Object.assign` in the context of our `HttpRequest` interface. In this example, we create the `req` variable with some base values defined for the properties. We then use `Object.assign` to merge another object with the target. I think the key thing to note in the example is that the `headers` property on the source object will completely overwrite the property on the target due to the shallow merge functionality.

```typescript
const req: HttpRequest = {
  baseUrl: "https://test.com/api",
  headers: {
    "x-api-key": "api-key",
    authentication: "Bearer some-bearer-token",
  },
};

Object.assign(req, {
  url: "/users/1",
  method: "GET",
  headers: { "x-api-key": "a different api key" },
});

console.log(req);
```

The resulting object logged to the console looks like this.

![shallow-merge-object-assign.png](https://res.cloudinary.com/aaron-bos/image/upload/v1654990867/shallow_merge_object_assign_eaebba57e2.png)

#### Spread Syntax

`Object.assign` is the classic way to perform a shallow merge on objects. With the introduction of a [proposal](https://github.com/tc39/proposal-object-rest-spread) in ES2018 we now can use spread syntax as a more succinct way to shallow merge objects. In general, the spread syntax (`...`) is used to expand arrays or objects in place where zero or more properties or elements are expected. For the purpose of this post, we'll be focused on the functionality of merging objects with `...`. Just like with `Object.assign` the spread syntax only copies enumerable own properties to the target object.

Let's look at the previous example, but using `...` to merge the objects instead of `Object.assign`

```typescript
const req: HttpRequest = {
  baseUrl: "https://test.com/api",
  headers: {
    "x-api-key": "api-key",
    authentication: "Bearer some-bearer-token",
  },
};

var merged = {
  ...req,
  ...{
    url: "/spread/users/1",
    method: "GET",
    headers: { "x-api-key": "a different api key" },
  },
};

console.log(merged);
```

As you can see from the screenshot below, the result is similar to that of `Object.assign`. The `headers` key is completely overwritten by the source object's `headers` key object.

![shallow-merge-object-assign.png](https://res.cloudinary.com/aaron-bos/image/upload/v1654990867/shallow_merge_object_assign_eaebba57e2.png)

### Deep Merge

So far we've touched on a couple of different methods for shallow merging objects. Shallow merging will fit most use cases, but there are situations where it falls short. A deep merge differs from shallow merging in that object references are not copied from one object to another. The result of a deep merge will be completely new object references with the target object. This behavior may be desired if we want to avoid unintentionally changing values on objects after merging.

While there are some work arounds to accomplishing a deep merge with JS primitives, we're going to be looking at a method from a library called [Lodash](https://lodash.com/), which provides many utility functions that the language doesn't include in the standard library.

#### Lodash \_.merge()

In this section, we are going to be focusing on Lodash's `merge()` method. I don't always recommend reaching for one-off library methods, but deep merging of objects can actually be rather complicated and I think the value that Lodash (or an alternative) provides is worth the extra dependency. What makes this method different from previous methods is that it performs a deep merge of objects instead of shallow. This means that the resulting object shares no references with the source object(s). In order to accomplish this functionality the method recursively navigates source object keys and applies the new values to the target object.

If you'd like to check out the full implementation of `merge()` you can do so [here](https://github.com/lodash/lodash/blob/master/merge.js). The signature of `merge()` is similar to `Object.assign` as it accepts a target object and one or many source objects. It's important to note that the target object will be mutated as a result of the method.

```javascript
_.merge(target, [sources]);
```

Let's take a look at how we can use `merge` to perform a deep copy from our previous examples. As you will notice from the result, the `headers` key is merged differently than it was during shallow merge operations. The `x-api-key` key is replaced by the source object's value, but the target also includes the `authentication` and `Cache-Control` keys. This is a direct result of lodash's deep merge functionality.

```typescript
const req: HttpRequest = {
  baseUrl: "https://test.com/api",
  headers: {
    "x-api-key": "api-key",
    authentication: "Bearer some-bearer-token",
  },
};

_.merge(req, {
  url: "/deep/users/1",
  method: "GET",
  headers: {
    "x-api-key": "a different api key",
    "cache-control": "max-age=604800",
  },
});

console.log(req);
```

Here is a screenshot of the resulting object from `_.merge()`.

![deep-merge-lodash-merge.png](https://res.cloudinary.com/aaron-bos/image/upload/v1654990867/deep_merge_lodash_merge_d2cbace0da.png)

Merging objects can be challenging without a solid understanding of the available options. As with anything the method we choose will depend on the problem to be solved, but hopefully, this post explains the different options in our toolbelt to apply when needed.

### Resources

[Object.assign docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

[Spread syntax docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

[Lodash merge docs](https://docs-lodash.com/v4/merge/)
