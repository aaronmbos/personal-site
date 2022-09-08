---
id: 15
slug: iptc-metadata-csharp-imagesharp
title: "Parsing Image Metadata with C# and ImageSharp"
description: Recently I've been using C# and ImageSharp to work with images in code. In this post we'll be taking a look at how we can read and write IPTC Metadata properties for a given image.
publishedAt: 2021-08-16T00:26:08.428Z
updatedAt: 2021-08-16T00:26:08.508Z
metadata: dev,dotnet,csharp
---
## What is IPTC Metadata?

The [International Press Telecommunications Council](https://iptc.org/standards/photo-metadata/iptc-standard/) (IPTC for short) is the global standards body for news media. In the context of images and metadata, the IPTC Standard is the most widely accepted method to describe images. As with almost everything in software, this widely adopted standardization is important for being able to consistently describe and parse image metadata in applications.

The metadata itself is defined by a number of properties that are used to describe an image. I don't think it's helpful to list them all in this post, but here are several that I've seen frequently. See [here](http://www.iptc.org/std/photometadata/specification/IPTC-PhotoMetadata#metadata-properties) for the full list.

- Creator
- Date Created
- Description/Caption
- Keywords
- Source
- Credit
- Location

Now that we have a basic understanding of image metadata standards, let's discuss how we can work with metadata in code.

## Accessing Image Metadata with ImageSharp

I think the best way to work with images in C\# is to use [ImageSharp](https://sixlabors.com/products/imagesharp/). I believe this for a few reasons.

1. Robust functionality and intuitive API for working with many different image formats
2. Actively maintained open source project
3. Compatible with .NET 5, .NET Core, and .NET Framework

If you've spent any time working with images using the `System.Drawing` API, then I think you'll find ImageSharp to be a breath of fresh air when it comes to ease of use and developer experience.

For the rest of this post, we're going to be looking at code samples from a .NET 5 Console Application I created. If you'd like to see the `Program.cs` in its entirety, check out this GitHub [Gist](https://gist.github.com/aaronmbos/29ca86e4d4316574ea536ded0ab3a9a8).

### Loading the Image

Before we get too far, I'd like to call out the NuGet package and using statements required to make the following code snippets work smoothly. First, we'll install the ImageSharp NuGet package.

```
dotnet add package SixLabors.ImageSharp --version 1.0.3
```

Then we'll add the following lines to the top of our Program.cs file.

```
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Metadata.Profiles.Iptc;
```

In order to start working with an image, we need to "load" it into memory. This is a pretty simple task using ImageSharp and it can be done asynchronously or synchronously. Here's an example.

```
using (var image = await Image.LoadAsync($"./{_fileName}"))
{
    // Work with the image
}
```

It's important to wrap the usage of the `image` variable with a `using` statement so that the image resources can be properly disposed of when no longer needed. There are many overloads of the `Load` and `LoadAsync`, but in this instance, we are using the overload that accepts a `string` representing the path to the image file.

### Reading Metadata

With the image loaded into memory, we're ready to start reading the IPTC Metadata properties. To do this we'll create a static method called `ReadMetadata` that accepts an `ImageSharp.Image` object. Using the image object we can access the `Metadata` and `IptcProfile` properties. As you can see in the example the `IptcProfile` class has a `Values` property which is a collection of `IptcValue` objects.

```
private static void ReadMetadata(Image image)
{
    if (image.Metadata.IptcProfile?.Values?.Any() ?? false)
    {
        foreach (var prop in image.Metadata.IptcProfile.Values)
            Console.WriteLine($"{prop.Tag}: {prop.Value}");
    }
    else
        Console.WriteLine($"{_fileName} does not contain metadata{Environment.NewLine}");
}
```

To view the metadata we iterate through the collection of `IptcValue` objects and write the Tag and Value to the console output. The `Tag` property is of the type `IptcTag`, which is an enumeration of IPTC properties for images. If the image does not have any metadata, there is a chance for the `IptcProfile` property to be null. This is why we use the null conditional operators to avoid Null Reference Exceptions. Now that we've seen how we can view image metadata, let's take a look at how we can write metadata to an image.

### Writing Metadata

Using ImageSharp we are able to add or update an image's IPTC metadata. The process of writing metadata to an image is very similar to reading it. We'll do so by accessing the same `IptcProfile` property and calling the `SetValue` method. This method accepts an `IptcTag` and a string value for the metadata property. Let's take a look at an example.

```
private static void WriteMetadata(Image image)
{
    if (image.Metadata.IptcProfile == null)
        image.Metadata.IptcProfile = new IptcProfile();

    image.Metadata.IptcProfile.SetValue(IptcTag.Name, "Pokemon");
    image.Metadata.IptcProfile.SetValue(IptcTag.Byline, "Thimo Pedersen");
    image.Metadata.IptcProfile.SetValue(IptcTag.Caption, "Classic Pokeball Toy on a bunch of Pokemon Cards. Zapdos, Ninetales and a Trainercard visible.");
    image.Metadata.IptcProfile.SetValue(IptcTag.Source, @"https://rb.gy/hgkqhy");
    image.Metadata.IptcProfile.SetValue(IptcTag.Keywords, "Pokemon");
    image.Metadata.IptcProfile.SetValue(IptcTag.Keywords, "Pokeball");
    image.Metadata.IptcProfile.SetValue(IptcTag.Keywords, "Cards");
    image.Metadata.IptcProfile.SetValue(IptcTag.Keywords, "Zapdos");
    image.Metadata.IptcProfile.SetValue(IptcTag.Keywords, "Ninetails");
}
```

As you can see in the example above, we check to make sure the `IptcProfile` property isn't null, and then we can set IPTC properties using the `IptcTag` enum. It is important to note that some properties will add to existing metadata and others will overwrite existing metadata. For example, setting the `IptcTag.Keywords` and `IptcTag.Byline` metadata will not overwrite existing metadata, but just add to it. So if you set the Byline for an image that already has a Byline, the image will now contain two values with the property of Byline.

The field of image processing beyond IPTC metadata is very interesting and complex. In this post we've scratched the surface on a couple of different things we can do with images in code. If this was interesting, I would definitely recommend checking out more of what ImageSharp has to offer via their [documentation](https://docs.sixlabors.com/articles/imagesharp/?tabs=tabid-1) and [GitHub](https://github.com/sixlabors).