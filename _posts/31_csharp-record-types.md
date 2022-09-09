---
id: 31
slug: csharp-record-types
title: "Reasons to Use C# Record Types"
description: Prior to C# 9 classes were the defacto option for creating reference types in C#, but now we have records. In this post, we'll be going over a few details about C# records and also the benefits that I believe they can provide over using classes (in some scenarios).

publishedAt: 2022-03-10T01:32:52.197Z
updatedAt: 2022-03-10T01:32:52.228Z
metadata: dev,dotnet,csharp
---
## What is a Record?

Record types have been around since the release of C# 9 (November 2020), but unfortunately not everyone has a chance to use these newer bits on a daily basis. While I've read a lot of articles and heard the buzz about records since their release, I haven't had much of a chance to use them in the wild. For the context of this article we'll be viewing records as they are **currently** in #C 10 because there were some small changes with records from C# 9 to 10 (like being able to define records as `struct`s).

Currently records can be defined as reference or value types based on the presence of the `struct` keyword when defining the record. In the snippet below `PersonReference` will be defined as a class (reference type) under the hood and `PersonStruct` will be defined as a value type (just like standard structs). When I refer to the term "under the hood" in the context of records I'm referring to the fact that the C# compiler performs lowering that transform our records into fully formed classes or structs based on how they're defined.

```csharp
public record PersonReference(string FirstName, string LastName, int Age);

public record struct PersonStruct(string FirstName, string LastName, int Age);
```

While I don't want to go too deep into the syntax and all of the options available when working with Records because there is plenty of quality documentation out there on this, I would like to touch on a few points.

1. The examples above are known as _positional records_, which can be used to concisely define records.

2. When using positional records, the properties are defined as `init-only`. Meaning that they can't be modified after initialization.

3. Properties and methods can still be added to positional records. They are defined in `{ ... }` below the record definition.

```csharp
// Defining an additional property on a positional record
public record Person(string FirstName, string LastName, int Age) 
{
    public string FullName => $"{FirstName} {LastName}";
}
```

I would love to continue diving into the semantics of records, but I think it would be more valuable to transition to looking at reasons to use records in our code. If you'd like to continue diving into the details on records check out this nice tutorial on Microsoft docs [here](https://docs.microsoft.com/en-us/dotnet/csharp/whats-new/tutorials/records).

## Reasons to Use Records

One of the biggest mental hurdles that I've faced when using records in my code (beyond working with C# 9 and above regularly) is that I've never really known when and why I should use records over classes. It seems that whenever I had the chance to use a record, I would fall back to old habits and just use a class because I wasn't sure if I would be using a record correctly. After doing the research and having a bit more keyboard time with C# 10, I feel confident about when and why to use records. In the next three sections I'll be going through, what I believe, to be the main reasons to use records in C#.

### Immutability By Default

First up in my "reasons to use records" is immutability by default. What I mean by "immutability by default" is that records put developers in the pit of success when it comes try writing immutable code. While immutability may not ALWAYS be the desired functionality, I think that for many of our day to day use cases it is desired. Treating our types as immutable removes a whole class of bugs that can crop up when we pass an object to a function and that function ends up mutating the input unexpectedly. If we use positional records, we are provided immutability for the properties of the record. Let's use our previous `Person` record as an example.

```csharp
public record Person(string FirstName, string LastName, int Age);

Person me = new("Aaron", "Bos", 30);

// Once instantiated the properties of me can't be changed
me.Age = 25; // Results in compilation error
```

In the code above, when trying to change `me.Age` the compiler will give the following error because the positional record defines its properties as `init-only`.

```
error CS8852: Init-only property or indexer 'Main.Person.Age' can only be assigned in an object initializer, or on 'this' or 'base' in an instance constructor or an 'init' accessor.
```

At this point you may be wondering how to handle a case when a method receives a record as an input and would like to modify it. This is where `with` expressions come in! When using `with` expressions we can produce a copy of an existing record while also modifying property values for the copied result in the process. Here's an example of a `with` expression that creates a copy of a record instance `me` and modifies the `Age` property to create a new record instance.

```csharp
public record Person(string FirstName, string LastName, int Age);

Person me = new("Aaron", "Bos", 30);

var youngerMe = me with { Age = 25 };
```

I think that immutability is a key feature and benefit of using records. Let's take a look at how records evaluate equality with one another.

### Value Equality

If you've worked with C# long enough, you'll understand that creating an instance of a class will create a reference type object. If we want to compare two instances of the same classes, we'll be comparing the reference locations in memory and not the contents of the objects themselves. There are some work arounds with implementing `IEquatable<T>` and overriding certain members of the base `object` type like `Equals` and `GetHashCode`. If value like equality is what we're looking for, then C# records are what we want. Below is an example highlighting the difference when determining equality of classes and records.

```csharp
public class PersonClass
{
  public string FirstName { get; set; }
  public string LastName { get; set; }
  public int Age { get; set; }
}

var meClass = new PersonClass { FirstName = "Aaron", LastName = "Bos", Age = 30 };
var otherMeClass = new PersonClass { FirstName = "Aaron", LastName = "Bos", Age = 30 };

// This prints false because the objects are different references
Console.WriteLine(meClass == otherMeClass);

public record Person(string FirstName, string LastName, int Age);

var me = new Person("Aaron", "Bos", 30);
var otherMe = new Person("Aaron", "Bos", 30);

// This prints true because records compare property values, not reference locations
Console.WriteLine(me == otherMe);
```

I mentioned previously that C# records, by default, are classes under the hood. The compiler handles the tedious bits of implementing `IEquatable<T>` and overriding the necessary `object` members. For example, let's look at what the compiler generates for our `Person` record. I am going to reduce some of the clutter that is normally generated to avoid make the code snippet too long and unreadable.

```csharp
public class Person : IEquatable<Person>
{
  // Compiler generated private backing fields for each record property
  private readonly string _firstName;
  private readonly string _lastName;
  private readonly int _age;

  // Compiler generated public init-only properties
  public string FirstName { get; init; }
  public string LastName { get; int; }
  public int Age { get; init; }

  // Compiler generated default constructor
  public Person(string firstName, string lastName, int age) { ... }

  // Compiler generated overrides
  public override string ToString() { ... }
  public override int GetHashCode() { ... }
  public override bool Equals(object obj) { ... }

  // Other compiler generated members
  public virtual Person Clone() { ... }
  public virtual bool Equals(Person other) { ... }
  public static bool operator !=(Person left, Person right) { ... }
  public static bool operator ==(Person left, Person right) { ... }
}
```

If you'd like to see the full implementation head over to [SharpLab.io](https://sharplab.io/#v2:EYLgZgpghgLgrgJwgZwLQDdkCYAMWuowAWEAthADQAmIA1AD4ACWAjALABQjAzAATO8AwrwDenXhP59GAFl4BZABQBKUeMkBfdRO1TeSAMYB7BFV4AFCAmRGAdosYscvAGIBLazAByUchX5OvAAyUMjevpS8brYwvACCAOYQygDcnBpAA===) to see the compiler-generated code in all its glory. As you can see from the code snippet, records achieve value-like equality by doing some of the tedious work that we used to have to do for classes for us. I hope seeing some of this code takes away some of the mystique of records and reveals that they aren't all that different from using classes.

### Records Are Concise

The final sticking point for records, in my opinion, is how concise they are. In the majority of use cases our records can be defined in a single line of code. If we were to use a class to replace the record, it would require a little bit more screen real estate to do so. Let's continue using our `Person` example.

```csharp
public class PersonClass
{
  public string FirstName { get; set; }
  public string LastName { get; set; }
  public int Age { get; set; }
}

public record Person(string FirstName, string LastName, int Age);
```

As you can see from this quick example a small class with three properties will take up at a minimum six lines of a file (with standard formatting). The same record representation is a single line. While the `Person` class and record may not be functionally equivalent (ie the class properties being mutable vs record properties being init-only, value-like equality, etc), I honestly think that records provide more desirable behaviors for the majority of our class use cases like entities or data transfer objects (DTOs).

I would like to also mention that records do not have to be defined using the positional syntax like I've been using. They can be defined just like normal classes and will function just the same.

Overall I think that records are a great addition to C#. They may not be the silver bullet solution for every problem (I don't actually think that the silver bullet exists), but they do provide a way for developers to be more explicit about how they expect their code to function. I know that I'll be looking to use records in my code where it makes sense from here on out!
