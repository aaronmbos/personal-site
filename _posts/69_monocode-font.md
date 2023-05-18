---
id: 69
slug: monocode-font
title: "Monocode: A font for code"
description: "Over the past ten months I've been working on a custom font for me to use in programming environments. The font is called Monocode and in this post I'm going to talk about how I created it, why I created it, and what makes it unique. Let's dive in!"
publishedAt: YYYY-MM-DDTHH:MM:SS.000Z
updatedAt: YYYY-MM-DDTHH:MM:SS.000Z
metadata: dev,tools,fonts
---

Since becoming a software engineer I've enjoyed optimizing different aspects of my development environment. I think the reason why I enjoy it so much is that each person has their own preferences (or lack thereof), which allows for a bit of creativity in areas that can be typically mundane. In my opinion one of the most used, yet often overlooked, aspects of a development environment is the font used in editors and terminals. I've tried several different fonts over the years, but always found myself liking bits and pieces of individual fonts. That's why I decided to create [Monocode](https://github.com/aaronmbos/monocode).

![Monocode specimen](https://res.cloudinary.com/aaron-bos/image/upload/v1684413540/monocode-specimen_xicez5.png)

## How I created Monocode

I'd like to start of by saying that I didn't create Monocode from scratch. That would be a bit out of my wheelhouse and most likely a lot more work than I would've liked. Instead I created a heavily customized version of a font called [Iosevka](https://typeof.net/Iosevka/). Iosevka is an open-source font that is designed with flexibility in mind. By default it is narrower than most fonts, but can be easily customized to a normal width. The [maintainer](https://github.com/be5invis) has created an amazing [site](https://typeof.net/Iosevka/customizer) that allows you to customize specific characters of the font based on a set of predefined alternative glyphs.

The customization relies on a TOML configuration file containing the build plans for customization and a build script written in Node.js. Creating a custom version of the font can be done in a few simple steps that are all well documented on [GitHub](https://github.com/be5invis/Iosevka/blob/main/doc/custom-build.md#configuring-custom-build).

1. Clone the Iosevka repository
1. Modify the TOML configuration file with character customizations
1. Install the build dependencies
1. Run the build script

I've spent the last ten months adjusting characters and font metrics to fit my personal style. At this point the font has been pretty stable, which is why I feel that this is the right time to share it on this blog. At the time of writing the latest release of Monocode is version 4.0.3, which is based on Iosevka version 22.1.2.

## Features of Monocode

When it comes to fonts that are used in programming environments, there are a few characteristics that are common among them.

1. Fixed width or monospaced
1. Distinct characters
1. Readable at smaller sizes

Since Monocode is based on a well-established font like Iosevka, it already has all of these characteristics. However, I've made a few adjustments to the font that I think make it unique.

1. Larger x-height: I prefer a slightly larger x-height resulting in a taller lowercase characters. I think this helps the readability at smaller sizes. Another example of font that utilizes a larger x-height is JetBrains Mono.
1. Distinct characters: There are certain character combinations that can be easily confused like capital "O" and zero, capital "I" and lowercase "l", capital "B" and 8, etc. I've made adjustments to these characters to ensure they are easily distinguishable.
1. No ligatures:

## Updating and releasing Monocode
