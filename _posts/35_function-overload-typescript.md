---
id: 35
slug: function-overload-typescript
title: "Function Overloading in TypeScript"
description: While learning about TypeScript I came across function overloading. The way it works in TypeScript seemed different than what I was used to in languages like C# and Java. In this post, we'll be learning about overloading functions in TypeScript and potential alternatives that are better suited to certain situations.
publishedAt: 2022-04-20T01:03:28.132Z
updatedAt: 2022-04-20T01:19:49.758Z
metadata: dev,learning,typescript
---
## How to Overload a Function

In TypeScript, we can create a single method with multiple *signatures* that allow callers to provide different arguments to effectively the same method. When overloading a function there are two kinds of signatures to know about.

1. Overload Signature: contains a method name, parameters, and return type. Does not have an implementation.
  
2. Implementation Signature: Provides the actual implementation of the function using a **compatible** signature for the overload signatures.
  

In TypeScript, method signatures include the parameter types and return types of the overloaded method. Here is a quick example to demonstrate. If you'd like to follow along with the examples in this post head over to the TypeScript playground with this [link](https://www.typescriptlang.org/play?ssl=47&ssc=2&pln=43&pc=1#code/GYVwdgxgLglg9mABFApgZygCgSgXIjAJxjAHMBKfMEAWwCMVCBuAWAChRJYFl0sd8REqQA0yAO5xBUYmUqJq9Rqw7ho8JKgzYweAjOFiokgPzTZFKrQaFEAb3aIniGMEQ6UiAGRfEAQmM4cntHZzCIBDQ4ABsUADpouFJMAHIAFT5EcRgoAAtEHEQABwBDQhKaFPIVMLDCFCgQQiQARhrnAF9EFGi0Twc2WucIsCjYhKTUjIwsnPzA4rKKtCrQofrG5sQAJnanDvYDtnYtLAAiU7Pqk75MC74zsTOW7YBmK5V2TnUeFAAPCpFWIefB0OAxFAlMBGSTmQzIXL1PSKGzyABucBgABMVN9uEh-oDgQJ7KdQeDYlCxCShGQYVIFNZGB10ZicV81PjugCaECUCDSXxyRCqQVdHC6RIGSjmYgAD6IMEi6H6QhmVXwxTqmWEVnYkKDZyudxQACeRRQcDchQAvHbECklZSwFUBkMnCMxvFEskUoTebFZnkEUjEGVSCtrob9t1ev01rVPRCJr7-Xyg-lCuGqntEEcjuw08CZCAUGI-Ty+SkxK8o0X+XYyYhgCU49TxRWiShq1LcC0WZ82CRUIQWxBPABlIpwQiwMgAUTRKDAUANYVgUFiEtECaxJVQ+AAIvuywmIhgrEpCId2OwAPR35ucjSIeqkGAYRiYFBLlf4KcznOpCLsuUB6uybAPk+XAvm+H4jt+v5QGg-7TrOwggSuADaAC64EqFBeKwSg76foQiGgQAgoQEaoYBGFIfKiAAehC5Ibh4EGlBYTGpg1HlKacQfvxJSmhRK7URG5DBAM3Hukm4w+qkADCraxFiGZhoQAk5vej5hEcUEFqoME8HBZHiVAkl0axwGMQqLFAZhUAcfgGL6m6RpuHx2miUJaAiWJP5UTR0lrvJkTJkpKSqdE6maWUOlRgZN7HJBj5pLkH6zHFWQzgA1oqKAQCUIB9AUbh5J44AvmaFqLOUNANIw7CxKuuQlGgACyIDRLA6Y2sghClio5kIR13W9f1gYmIguGIPgjY5FuDrTFAPZ7geCgoOIiDHqgmDkGI55QPg-ZRuwQA).

```typescript
// Two overload signatures
function test(one: string): number;
function test(one: string, two: string): number;
// The implementation signature
function test(one: string, two?: string): number {
    if (one && !two) {
        console.log('Test with one param');
        return 1;
    } else {
        console.log('Test with two params')
        return 2;
    }
}
```

As you can see there are two overload signatures above the implementation signature. I think there are a few key points in this example.

1. The implementation signature must define `two` as optional because the parameter does not exist in the first overload signature.
  
2. The actual function implementation needs to check for the existence of parameters before taking action so that the appropriate value can be returned based on the overload being executed.
  
3. The implementation signature can't be visible to method callers. This means that function overloads need a minimum of two overload signatures to satisfy the compiler.

While I find TypeScript's implementation of overloading functions interesting, I also don't see a lot of value in it since the same implementation is used for all signatures. It almost feels like the implementation will be a little more convoluted than necessary due to additional parameter checking.

## Potential Downsides of Function Overloading

In this section, we're going to go through a couple of scenarios that I would consider downsides to overloading functions in TypeScript. These downsides are based on opinions that I have formed while learning about function overloads. I am a firm believer in not holding on to most opinions too tightly, so if I am in a situation where overloading a method makes the most sense then I will be happy to do so.

### Convoluted Implementations

One of the main reasons that I would shy away from overloaded functions is because I think they can lead to convoluted implementations. The example I showed previously was very simple. We were only dealing with two overload signatures and two method parameters. Imagine what the implementation may look like when there are a few overload signatures and a handful of implementation parameters.

I think this can lead to code that relies on a lot of type guards and conditional checks to make sure the right code path is executed for the given overload. In most cases, I think I would prefer an overloaded method to be broken up into multiple methods to avoid unnecessary complexity in the implementation.

### Complex Signatures

The next downside that I think overloaded methods can lead to is signatures that are difficult to understand. This may be a more personal gripe than any other, but I find the combination of overload and implementation signatures difficult to quickly parse and understand. Whenever I see an overloaded method it takes me a little bit of time to completely understand what the signatures are defining. Let's take a look at a quick example of an overload with two signatures. The first accepts three arguments and the second accepts a single argument object.

```typescript
function example(one: boolean, two: string, three: number): void;
function example(one: {test: boolean, one: string, two: number}): void;
function example(one: {test: boolean, one: string, two: number} | boolean, str?: string, num?: number): void {
    if (typeof one === 'boolean'){
        console.log('example with three args');
    } else {
        console.log('example with one arg');
    }
}
```

As you can see from that code snippet the implementation signature is quite lengthy and a little difficult to figure out what is going on (in my opinion). If you find this code easy to read, then this may not be a total downside for you. I would much prefer seeing two separate methods.

### Overloaded Functions Lack Flexibility

One aspect of TypeScript that I personally enjoy is the flexibility provided by the type system. When I am writing TypeScript, I really just feel like I'm writing JavaScript with some additional guard rails that add to my confidence that the code will run as I expect it to.

I think that overloaded functions take away some of this flexibility because the overload signatures are static and will only accept the parameters they are defined with. For example, we can define an overloaded method that accepts a single object or an array of objects. When calling this overloaded we can call it with an object instance or an array instance, but we can't call when that value could be either. Let's look at an example.

```typescript
interface SportingEvent {
    title: string,
    date: Date,
    cost: number
}

function register(event: SportingEvent): void;
function register(events: SportingEvent[]): void;
function register(eventArgs: SportingEvent | SportingEvent[]): void {
    if (Array.isArray(eventArgs)) {
        console.log('Called with array');
    }
}

// This will not work because no overload signature is matched
let hasMultiple = true;
register(hasMultiple ? [] : {title: 'Test', date: new Date(), cost: 1});
```

## Alternative to Function Overloading

One thing that I found particularly interesting while learning about overloading functions in TypeScript is that the documentation recommends using union types when possible instead of overloading. I think the main advantage of using union type parameters over function overloads is the added flexibility that we saw overloads lacking in the previous example.

If we look at the previous example again, but this time using a union type as the method parameter we can see the flexibility firsthand.

```typescript
function register(eventArg: SportingEvent | SportingEvent[]): void {
    if (Array.isArray(eventArg)) {
        console.log('Called with array');
    }
}

// This will work because of the union type parameter
let hasMultiple = true;
register(hasMultiple ? [] : {title: 'Test', date: new Date(), cost: 1});
```

Union type parameters offer additional flexibility but have a potential downside of being littered with type guards and conditionals. I would also consider creating multiple methods as a valid alternative to both overloading and union types. What may be lost in brevity, I think can be gained in the readability.

Overall I think that overloading functions is a great feature, but should be used only when necessary. As with many things in software development, the context and situation will help determine the implementation for each unique problem we face.