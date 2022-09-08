---
id: 47
slug: vs-code-dotnet-setup
title: "VS Code Setup for .NET Development"
description: Visual Studio is and probably always will be the defacto IDE for .NET development, but that doesn't mean there aren't other options out there. In this post, we're going to learn about several extensions available for VS Code that make writing .NET a productive and enjoyable experience. Let's dive in!
publishedAt: 2022-08-21T23:48:33.226Z
updatedAt: 2022-08-21T23:48:33.243Z
metadata: dev,dotnet,csharp
---
## Benefits of VS Code

For the longest time, .NET developers were required to work on Windows machines due to the platform limitations of the .NET Framework. The introduction of .NET Core ([Mono](https://www.mono-project.com/) was also available even before .NET Core, but not widely adopted) changed the story for .NET's platform dependency and allowed for cross-platform development. This evolution opened up a lot of possibilities for .NET developers including writing code on macOS or Linux.

Visual Studio is still the goto editor for .NET development, but it currently only runs on Windows. There are other "IDE" options like Visual Studio for Mac (the jury is still out on whether or not this is a viable tool at this point) and JetBrains Rider. These options are aimed at being fully featured IDEs targeting .NET development in particular. IDEs provide a robust development experience but come with sluggishness and many features that are not required during day-to-day development.

This is where I think editors like VS Code and Neovim come into play. Both VS Code and Neovim provide a lightweight editor experience out of the box with the ability to add functionality via extensions or plugins. This means that developers only need to install the extensions that they need to do their work and nothing more. I find this experience to be a little more enjoyable than using _potentially_ more sluggish IDEs.

If you're interested in learning about .NET development in Neovim, head over to this post that I wrote [here](https://aaronbos.dev/posts/csharp-dotnet-neovim). Otherwise, keep on reading to learn more about tailoring VS Code to be a functional editor for .NET development.

## Extensions

In this section, we'll be touching on several extensions that I feel are useful for .NET development in VS Code. Each extension will provide functionality that enhances the development experience. 

### C#

Of all the extensions listed in this post, the [C#](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp) extension is the most important and one that I would consider a requirement. With this extension VS Code will be able to provide many of the basic features that you typically expect when writing C# code in another IDE. Features like the ones listed below and many more.

1. Syntax highlighting
1. Reference finding
1. Go to definition
1. C# specific context menus

The extensions that follow are mostly aimed to improve developer experience, whereas this extension is a requirement. Take a look at the following screenshots of the difference between VS Code **without** the C# extension installed and then with it installed.

As you can see in the GIF below, there is no C# specific intellisense as I am typing. The only menu that appears is the recognition of the existing token "args".

![no-csharp-ext.gif](https://res.cloudinary.com/aaron-bos/image/upload/v1661086148/no_csharp_ext_8ab0a49c29.gif)

This GIF is after the installation of the C# extension. In this case, the C# specific intellisense appears immediately as I type the `.` and continue writing `WriteLine`.

![csharp-ext-installed.gif](https://res.cloudinary.com/aaron-bos/image/upload/v1661086216/csharp_ext_installed_9242a0c527.gif)

If your projects utilize a `.editorconfig` file for formatting, code style, naming conventions, or Roslyn analyzer behavior I would highly recommend adding these lines to your `settings.json`. Doing so will tell the Omnisharp language server to use the `.editorconfig` to provide the necessary analysis and formatting messages in the editor.

```json
"omnisharp.enableEditorConfigSupport": true,
"omnisharp.enableRoslynAnalyzers": true
```

### C# Snippets

This next extension is very useful for speeding up common C# language constructs during development. With the [C# Snippets](https://marketplace.visualstudio.com/items?itemName=jorgeserrano.vscode-csharp-snippets) extension we are able to use shortcuts or "snippets" to create things like try/catch blocks, using blocks, if/else blocks, properties, constructors and many more. It may take a little bit to commit the snippets to memory, but once they're there they can really speed up the creation of boilerplate code. Let's look at a couple of examples. In the context menus, you'll notice a little square next to the snippets that can be expanded.

**Using statement (`using`)**

![using-snippet.gif](https://res.cloudinary.com/aaron-bos/image/upload/v1661086362/using_snippet_f73d1d6321.gif)

**Try/Finally block (`tryf`)**

![tryf-snippet.gif](https://res.cloudinary.com/aaron-bos/image/upload/v1661086362/tryf_snippet_fedfb4402f.gif)

**Constructor (`ctor`)**

![ctor-snippet.gif](https://res.cloudinary.com/aaron-bos/image/upload/v1661086362/ctor_snippet_0ac501d08e.gif)

### .NET Core Test Explorer

Any serious codebase will most likely have tests included and a UI for running tests from within the editor can be extremely helpful. In .NET Core, we always can fall back to the command line, but I don't think anyone would turn down the chance to run individual tests at the click of a button directly in the editor. This is exactly the functionality that the [.NET Core Test Explorer](https://marketplace.visualstudio.com/items?itemName=formulahendry.dotnet-test-explorer) extension provides.

With this extension installed we are able to run or debug individual tests by clicking a button above the test method declaration or from the Test Explorer menu. This menu can be really helpful during development when the focus is on running individual tests instead of the entire test suite.

![test-explorer-inline.png](https://res.cloudinary.com/aaron-bos/image/upload/v1661087021/test_explorer_inline_8e25eca31c.png)

![test-explorer.gif](https://res.cloudinary.com/aaron-bos/image/upload/v1661086362/test_explorer_e8e99fcdbd.gif)

### Error Lens

[Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens) is another extension that I would put in the category of developer experience. This extension will display error, info, warning, etc. messages in line with the code. I think this can be really helpful for quickly diagnosing syntax errors or keeping code warning free. Without this extension, all of the messages would still be visible by hovering over the code or by viewing the PROBLEMS tab at the bottom of the window. Another great thing about this extension is that it is applicable to all languages. It simply relies on the language server output to display the messages.

**Error**

![error-lens-error.png](https://res.cloudinary.com/aaron-bos/image/upload/v1661087021/error_lens_error_f395f9da97.png)

**Suggestion**

![error-lens-suggestion.png](https://res.cloudinary.com/aaron-bos/image/upload/v1661087021/error_lens_suggestion_dc7052d5ab.png)

## Extras

These extensions don't necessarily enhance the development experience for .NET development in VS Code, but I do personally find them useful so I thought it would be worth including them.

- [Vim](https://marketplace.visualstudio.com/items?itemName=vscodevim.vim): Vim emulation within VS Code.
- [ILSpy VS Code](https://marketplace.visualstudio.com/items?itemName=icsharpcode.ilspy-vscode): View decompiled C# and IL code directly in VS Code.
- [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens): Enhance git experience with inline context and much more.
- [Open in GitHub](https://marketplace.visualstudio.com/items?itemName=ziyasal.vscode-open-in-github): Open the specific file or line in GitHub.

At this point, your VS Code environment should be all set for .NET development. In my next post, we'll discuss the debugging experience in VS Code to round out the complete development experience.
