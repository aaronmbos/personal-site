---
id: 63
slug: ffmpeg-wasm-browser
title: "Running FFmpeg in the Browser with WASM"
description: "The introduction of Web Assembly (WASM) into the web space has opened up so many doors that were simply not possible before. In this post, I'll be providing a gentle introduction to Web Assembly and how share an example of how it is used to run FFmpeg directly in the browser."
publishedAt: 2023-02-DDTHH:MM:SS.000Z
updatedAt: 2023-02-DDTHH:MM:SS.000Z
metadata: dev,web,wasm,video
---

## Running FFmpeg in the Browser

I recently started a little project that involves running FFmpeg directly in the browser using ffmpeg.wasm. The project is still **very** early and I'm not totally sure where I'm going to take it or if I'll continue working on it. For now I'm having fun learning about Web Assembly, while also expanding my knowledge of FFmpeg. At the time of writing the [site](https://lovely-gecko-4fbf77.netlify.app/) simply allows you to select a video file to "upload", which then results in an FFmpeg command running to generate a JPEG from a frame of the video. Nothing too exciting, but I've had some thoughts about potentially creating a FFmpeg command builder or providing autocompletion for FFmpeg commands. This could allow for quick feedback while iterating on FFmpeg commands. If any of this sounds interesting, head over to the [repo](https://github.com/aaronmbos/browser-ffmpeg) on GitHub and give it a star.

If you've got to this point in the post and don't really know much about FFmpeg, that's totally cool. I have a particular interest in it given that I work on software everyday that relies on it. With that being said this post is more focused on the potential of Web Assembly in the browser.

## FFmpeg.wasm

As a quick example of what is possible with Web Assembly I want to go into a little bit of detail about the [ffmpeg.wasm project](https://github.com/ffmpegwasm/ffmpeg.wasm) itself. FFmpeg is a C program that is used for just about anything you can imagine in the world of video and audio processing. As you may know C code does not run natively in the browser, so how does ffmpeg.wasm work? The answer is Web Assembly. I'll dive into some of the details in the next section, but at a high-level ffmpeg.wasm works by transpiling the original C code into Web Assembly. Since Web Assembly can be ran in the browser ([for the most part](https://caniuse.com/wasm)), it brings the media processing powers of FFmpeg to the web.

A few other popular examples of Web Assembly being used on the web are [Figma](https://www.figma.com/blog/webassembly-cut-figmas-load-time-by-3x/), [Adobe Acrobat on the Web](https://blog.developer.adobe.com/acrobat-on-the-web-powered-by-webassembly-782385e4947e), and .NET's client framework [Blazor](https://dotnet.microsoft.com/en-us/apps/aspnet/web-apps/blazor). I'm sure there are hundreds of other great examples out there as well. Web Assembly is not necessarily "new", but it is growing in popularity. In the next section we'll touch look at the features that make Web Assembly such an appealing tool for building on the web.

## Web Assembly

I've touched on some examples of Web Assebly in the wild, but I haven't really gone into what makes it "special". Web Assembly, commonly referred to as WASM, is not a programming language that you'll find many (if any) people writing by hand. The best way to describe WASM is a "compiliation target". I like to think of Web Assembly as the result of compiling code from another language like C, Rust, Go, C#, etc. For that reason Web Assembly can be quite strict in terms of its language features and functionality.
