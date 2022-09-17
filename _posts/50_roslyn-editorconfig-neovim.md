---
id: 50
slug: dotnet-roslyn-editorconfig-neovim
title: "Enabling Roslyn EditorConfig Support in Neovim"
description:
publishedAt: tbd
updatedAt: tbd
metadata: dotnet,csharp,neovim,tools
---

## Environment Setup

Before diving into the details of making this all work let's go over the prerequisites. In this post I'm assuming that you're local environment is mostly setup for .NET development with Neovim. This involves installing the Omnisharp language server and configuring it with Neovim's built in LSP options. If you'd like to learn more about this setup head over to my previous post [here]().

If you've got all that setup and you're looking to enable Roslyn code analysis via an EditorConfig, you're in the right place. To start we need to create a `.omnisharp` directory inside of our `$HOME` directory.

```shell
mkdir ~/.omnisharp
```

Inside of the `.omnisharp` directory we'll want to create an `omnisharp.json` file, which will contain our configuration for the Omnisharp langauge server.

```shell
cd ~/.omnisharp && touch omnisharp.json
```

With `omnisharp.json` created we're now ready to add the following JSON object.

```json
{
  "RoslynExtensionsOptions": {
    "enableAnalyzersSupport": true
  },
  "FormattingOptions": {
    "enableEditorConfigSupport": true
  }
}
```

As you can see we have added two boolean fields to the `omnisharp.json` and both are required to allow for the Omnisharp server to start providing editor suggestions based on the rules specified in a `.editorconfig` file. The `"RoslynExtensionsOptions"` field is responsible for eefining behavior for features like refactorings and code actions. The `"FormattingOptions"` field is pretty self-explanatory in that its fields define rules for formatting C# code. These rules can be supplied in the `omnisharp.json` or in a separate `.editorconfig`, which is what our example above does. For more information about the `omnisharp.json` file check out the documentation [here](https://github.com/OmniSharp/omnisharp-roslyn/wiki/Configuration-Options).

## Code Examples
