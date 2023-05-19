---
id: 69
slug: monocode-font
title: "Monocode: A font for code"
description: "Over the past ten months I've been working on a custom font for me to use in programming environments. The font is called Monocode and in this post I'm going to talk about how I created it, why I created it, and what makes it unique. Let's dive in!"
publishedAt: 2023-05-18T07:00:00.000Z
updatedAt: 2023-05-18T07:00:00.000Z
metadata: dev,tools,fonts
---

Since becoming a software engineer I've enjoyed optimizing different aspects of my development environment. I think the reason why I enjoy it is that each person has their own preferences (or lack thereof), which allows for a bit of creativity in areas that can be typically mundane. In my opinion, one of the most used, yet often overlooked, aspects of a development environment is the font used in editors and terminals. I've tried several different fonts over the years but always found myself liking bits and pieces of individual fonts. That's why I decided to create [Monocode](https://github.com/aaronmbos/monocode).

![Monocode specimen](https://res.cloudinary.com/aaron-bos/image/upload/v1684413540/monocode-specimen_xicez5.png)

## How I created Monocode

I'd like to start off by saying that I didn't create Monocode from scratch. That would be a bit out of my wheelhouse and most likely a lot more work than I would've liked. Instead, I created a heavily customized version of a font called [Iosevka](https://typeof.net/Iosevka/). Iosevka is an open-source font that is designed with flexibility in mind. By default, it is narrower than most fonts but can be easily customized to normal width. The [maintainer](https://github.com/be5invis) has created an amazing [site](https://typeof.net/Iosevka/customizer) that allows you to customize specific characters of the font based on a set of predefined alternative glyphs.

The customization relies on a TOML configuration file containing the build plans for customization and a build script written in Node.js. Creating a custom version of the font can be done in a few simple steps that are all well documented on [GitHub](https://github.com/be5invis/Iosevka/blob/main/doc/custom-build.md#configuring-custom-build).

1. Clone the Iosevka repository
1. Modify the TOML configuration file with character customizations
1. Install the build dependencies
1. Run the build script

I've spent the last ten months adjusting characters and font metrics to fit my personal style. At this point, the font has been pretty stable, which is why I feel that this is the right time to share it on this blog. At the time of writing the latest release of Monocode is version 4.0.3, which is based on Iosevka version 22.1.2.

## Features of Monocode

When it comes to fonts that are used in programming environments, there are a few characteristics that are common among them.

1. Fixed width or monospaced
1. Distinct characters
1. Readable in smaller sizes

Since Monocode is based on a well-established font like Iosevka, it already has all of these characteristics. However, I've made a few adjustments to the font that I think makes it unique.

1. Larger x-height: I prefer a slightly larger x-height resulting in taller lowercase characters. I think this helps the readability of smaller sizes. Another example of a font that utilizes a larger x-height is JetBrains Mono.
1. Distinct characters: There are certain character combinations that can be easily confused like capital "O" and zero, capital "I" and lowercase "l", capital "B" and 8, etc. I've made adjustments to these characters to ensure they are easily distinguishable.
1. Italics: While the regular style is used most commonly in programming environments, I find it useful to set certain text to italic. For example, I use italics for code comments to differentiate them from the code itself. With Monocode in particular, I've made the italic style a bit more curly than just a slanted version of the regular style. Letters like "a", "i", "l", and "f" have slightly different variations for the italic style, which makes the font a bit more unique.

One font feature that many developers look for is ligatures. While Iosevka does support ligatures, I've decided to disable them in Monocode. I've found that ligatures can be distracting and I prefer to have the characters separated. However, if you do like ligatures, you can easily enable them in the customization configuration file.

## Updating and releasing Monocode

One of the aspects of Monocode that I'm most proud of is the build and release pipeline. At the time of writing, I've set up a few GitHub actions that automate the process of building new versions and creating releases. The effort that I've put into this automation allows me to easily update the font and test variations without needing to worry about all of the work that goes into manually building the font locally and creating new releases manually.

When it comes to automation, there is currently an action that runs every day to get the latest version of Iosevka. In the Monocode repo, I keep track of the Iosevka version that Monocode is using and compare it to the latest version when the action runs. If the latest version of Iosevka is different from the version that Monocode is using, the action will create a new branch and create a pull request with the updated version. This allows me to easily review the changes and merge them into the main branch. Once the changes are merged, another action will run to build the font and create a new release. The new Monocode version will be based on the new version of Iosevka. So for example, if Iosevka is updated from version 22.1.2 to 22.1.3, Monocode will be updated from version 4.0.3 to 4.0.4.

There are also a handful of images on the GitHub repo README demonstrating the font and some of its features. I've created an action that will automatically generate these images using a command line tool called ImageMagick. This allows the images to be quickly updated when the font changes.

Putting so much thought and effort into a font for programming isn't for everyone or most people for that matter. It is a quirky interest of mine that I enjoy and I hope that others will find it useful as well. If you're interested in trying out Monocode, you can download it from the releases pages on GitHub [here](https://github.com/aaronmbos/monocode/releases).
