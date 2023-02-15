---
id: 63
slug: ffmpeg-wasm-browser
title: "Running FFmpeg in the Browser with Wasm"
description: "The introduction of WebAssembly (Wasm) has enabled developers to create experiences on the web that rival native performance. In this post, I'll provide an introduction to WebAssembly and also share an example of how it is leveraged to run FFmpeg directly in the browser."
publishedAt: 2023-02-DDTHH:MM:SS.000Z
updatedAt: 2023-02-DDTHH:MM:SS.000Z
metadata: dev,web,wasm,video
---

## Running FFmpeg in the Browser

I recently started a little project that involves running FFmpeg directly in the browser using [ffmpeg.wasm](https://ffmpegwasm.netlify.app/). The project is still **very** early and I'm not totally sure where I'm going to take it or if I'll continue working on it long-term. For now, I'm having fun learning about WebAssembly, while also expanding my knowledge of FFmpeg. At the time of writing the [site](https://lovely-gecko-4fbf77.netlify.app/) simply allows you to select a video file to "upload", which then results in an FFmpeg command running to generate a JPEG from a frame of the video. Nothing too exciting, but I've had some thoughts about potentially creating an FFmpeg command builder or providing autocompletion for FFmpeg commands. This could allow for quick feedback while iterating on creating FFmpeg commands. If any of this sounds interesting, head over to the [repo](https://github.com/aaronmbos/browser-ffmpeg) on GitHub and give it a star.

If you've got to this point in the post and don't really know much about FFmpeg, that's totally cool. I have a particular interest in it given that I work on software every day that relies on it. With that being said this post is more focused on the potential of WebAssembly in the browser rather than discussing the details of FFmpeg.

## FFmpeg.wasm

As a quick example of what is possible with WebAssembly I want to go into a little bit of detail about the [ffmpeg.wasm project](https://github.com/ffmpegwasm/ffmpeg.wasm) itself. FFmpeg is a C program that is used for just about anything you can imagine in the world of video and audio processing. As you may know, C code does not run natively in the browser, so how does ffmpeg.wasm work? The answer is WebAssembly. I'll dive into some of the details in the next section but at a high-level ffmpeg.wasm works by transpiling the original C code into WebAssembly. Since WebAssembly can run in the browser, it brings the media processing powers of FFmpeg to the web.

A few other popular examples of WebAssembly being used on the web are [Figma](https://www.figma.com/blog/webassembly-cut-figmas-load-time-by-3x/), [Adobe Acrobat on the Web](https://blog.developer.adobe.com/acrobat-on-the-web-powered-by-webassembly-782385e4947e), and .NET's client framework [Blazor](https://dotnet.microsoft.com/en-us/apps/aspnet/web-apps/blazor). I'm sure there are hundreds of other great examples out there as well. WebAssembly is not necessarily "new", but it is growing in popularity. In the next section, we'll look at a few features that make WebAssembly such an appealing tool for building with performance in mind on the web.

## WebAssembly

I've touched on some examples of WebAssembly in the wild, but I haven't gone into what makes it "special". WebAssembly, commonly referred to as "Wasm", is not a programming language that you'll find many (if any) people writing by hand. The best way to describe Wasm is a "compilation target". I like to think of WebAssembly as the result of compiling code from another language like C, Rust, Go, C#, etc. The main goal of Wasm is to enable high-performance applications on the Web. In my opinion, there are three key features of Wasm that contribute to the overall goal of "high-performance web applications".

1. Fast
1. Safe
1. Portable

### Key Feature: Speed

Wasm is able to achieve near-native performance in the browser by taking advantage of common hardware capabilities. Another factor in the speed of Wasm is that the code itself is a low-level, efficient binary format that is quicker for browsers to load and execute. While I wasn't able to find any "official" benchmarks comparing Wasm to JS, it seems that Wasm _typically_ runs 1-3 times faster than JS in the browser. This may not seem like a lot, but in applications where performance matters, that difference can make or break the user experience of the application.

### Key Feature: Security

Speed is great, but another very important feature of Wasm is security. I would argue that in most cases speed is irrelevant if the execution environment isn't safe for users or developers. For that reason, Wasm executes in a memory-safe, sandboxed environment, which claims to prevent data corruption and security breaches. Wasm provides no access to the environment that the code is executed on. Wasm is able to access system resources and perform IO when it is allowed by the embedder (the embedder defines the environment that Wasm will be hosted in).

### Key Feature: Portability

While this post and most of the focus on WebAssembly is scoped to running it on the web, one of the key features of the Wasm code format is that it is platform agnostic. Wasm's architecture does its best not to make assumptions about the underlying hardware that it is run on. This means that Wasm is built to take advantage of both common and modern hardware components. Wasm has started to become more common on the web, but it is possible to run it outside of the web given its platform-agnostic architecture. An example of WebAssembly outside of the browser is "WASI" or [The WebAssembly System Interface](https://wasi.dev/), the goals of WASI appear to align well with Wasm in general, but seem to be more targeted at portability and security.

I think that overall Wasm's speed, security, and portability make it an attractive tool for enabling high-performance code on the web. This post is by no means meant to be a deep dive into everything that Wasm has to offer, but rather an introduction to a technology that operates at a different level than what most developers are used to dealing with. There is a lot of great information available for WebAssembly and if you're interested in learning more I think the [specification](https://webassembly.github.io/spec/core/index.html) is a great place to start. It provides some high-level information along with everything you'd expect from a formal specification.
