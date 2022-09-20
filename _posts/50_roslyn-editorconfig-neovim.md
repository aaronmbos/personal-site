---
id: 50
slug: dotnet-roslyn-editorconfig-neovim
title: "Enabling Roslyn EditorConfig Support in Neovim"
description: In many editors and languages code analysis is a feature that is nearly expected to be available out of the box. With C# and .NET, the Roslyn API and Omnisharp language server are tools that make code analysis possible. In this post, we're going to look at how we can put these tools to use in Neovim resulting in a better development experience. Let's dive in!
publishedAt: 2022-09-19T00:45:00.000Z
updatedAt: 2022-09-19T00:45:00.000Z
metadata: dotnet,csharp,neovim,tools
---

## Environment Setup

Before diving into the details of making this all work, let's go over the prerequisites. In this post, I'm assuming that you're local environment is mostly set up for .NET development with Neovim. This involves installing the Omnisharp language server and configuring it with Neovim's built-in LSP options. If you'd like to learn more about this setup, head over to my previous post [here](https://aaronbos.dev/posts/csharp-dotnet-neovim) where this setup is covered in more depth.

If you've got all that setup and you're looking to enable Roslyn code analysis via an EditorConfig file in your project, you're in the right place. To start we need to create a `.omnisharp` directory inside of our `$HOME` directory.

```shell
mkdir ~/.omnisharp
```

Inside the `.omnisharp` directory we'll want to create an `omnisharp.json` file, which will contain our configuration for the Omnisharp language server.

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

As you can see we have added two boolean fields to the `omnisharp.json` and both are required to allow for the Omnisharp server to start providing editor suggestions based on the rules specified in a `.editorconfig` file. The `"RoslynExtensionsOptions"` field is responsible for defining behavior for features like refactoring and code actions. The `"FormattingOptions"` field is pretty self-explanatory in that its fields define rules for formatting C# code. These rules can be supplied in the `omnisharp.json` directly or in a separate `.editorconfig`, which is what our example above does. For more information about the `omnisharp.json` file check out the documentation [here](https://github.com/OmniSharp/omnisharp-roslyn/wiki/Configuration-Options).

## Code Examples

We now have everything needed to get Roslyn code analysis working with EditorConfig rules. I wanted to show a quick example of what this looks like in Neovim. I've set up a basic .editorconfig in an example project that has the following rules.

- Private and internal field names being prefixed with `_`
- If statements should contain braces
- Variables should be implicitly typed with `var`

```
# Name all private fields with `_` prefix and camelCase
dotnet_naming_rule.camel_case_for_private_internal_fields.severity = suggestion
dotnet_naming_rule.camel_case_for_private_internal_fields.symbols  = private_internal_fields
dotnet_naming_rule.camel_case_for_private_internal_fields.style    = camel_case_underscore_style
dotnet_naming_symbols.private_internal_fields.applicable_kinds = field
dotnet_naming_symbols.private_internal_fields.applicable_accessibilities = private, internal
dotnet_naming_style.camel_case_underscore_style.required_prefix = _
dotnet_naming_style.camel_case_underscore_style.capitalization = camel_case

# Prefer braces
csharp_prefer_braces = true:silent

# Prefer var
csharp_style_var_for_built_in_types = true:suggestion
csharp_style_var_when_type_is_apparent = true:suggestion
csharp_style_var_elsewhere = true:suggestion
dotnet_style_predefined_type_for_locals_parameters_members = true:suggestion
dotnet_style_predefined_type_for_member_access = true:suggestion
```

### Example with EditorConfig-based Roslyn Suggestions

![Roslyn Suggestions](https://res.cloudinary.com/aaron-bos/image/upload/v1663633490/roslyn-editor-suggestions_a16xn2.png)

**Now following the EditorConfig rules**

![Corrected Editor](https://res.cloudinary.com/aaron-bos/image/upload/v1663635573/corrected-editor_mhtpmz.png)

The screenshots above are also using a Neovim plugin known called [trouble.nvim](https://github.com/folke/trouble.nvim), which adds a bit of the UI for displaying the hints, suggestions, and errors in the editor. One point that I'd like to call out in the first screenshot containing Roslyn suggestions is the text indicators near the line numbers on the left side of the window. These hints are also provided by trouble.nvim, but help indicate the type of rule being notified.

For EditorConfig files relating to C#, we may have rules with the following severities. Each severity (if visible) will be mapped to a character that gets displayed in the UI when the LSP identifies it.

- error - E
- warning - W
- suggestion - I (information)
- silent - H (hint)

At this point, we should have code analysis support in Neovim that is on par with other editors like VS Code and Rider. If you enjoyed this post, stay tuned for more like it in the future. I have a personal goal of making Neovim my daily driver for .NET development. I have a few more things to work out like debugging and test running, so more to come!
