---
id: 21
slug: csharp-dotnet-editorconfig
title: "Formatting C# Code with EditorConfig"
description: Code style and formatting can be polarizing, to say the least. One way to remove subjectivity about code style preferences within a codebase is to enforce specific rules. In this post we're going to talk about how using the EditorConfig file standard can help provide consistent styles throughout a codebase.
publishedAt: 2021-11-16T05:58:28.876Z
updatedAt: 2021-11-16T05:58:28.899Z
metadata: dotnet,csharp,dev
---
## What is EditorConfig?

Before we get too deep into applying the EditorConfig standard specifically to C#, we should take a quick look at the EditorConfig in general to understand its place in the development ecosystem. EditorConfig is a file format and standard that can be used to apply formatting preferences to code documents. One of the key benefits of following the EditorConfig specification is the wide-ranging support from editors and IDEs. For example, we can define an EditorConfig file and have the preferences be applied in Visual Studio Code, Rider, and Visual Studio. This means that all team members aren't required to use the same tools to collaborate in a codebase 🙌 .

The EditorConfig file is simply a file named `.editorconfig` normally found at the root of a project or repository. It is possible to have multiple `.editorconfig` files scoped to different directories. This can be done by adding `root=true` to the `.editorconfig` file. For example, if there is an `.editorconfig` file at the root of the repository, but also an `.editorconfig` (containing the line `root=true`) in a sub-directory then any files inside of the sub-directory will use the preferences defined in that `.editorconfig` as opposed to the one located at the root.

The EditorConfig standard uses the INI file format. Sections can be defined based on file path globs (very similar to the globbing patterns used in `.gitignore` files). This allows preferences to be defined for specific purposes based on directory or file names. The following properties are supported by default and are case-sensitive (editor and IDE plugins can add support for many more language-specific properties as we'll look at later).

- `indent_style`: the classic tabs or spaces debate 😅
- `indent_size`: number of columns to use for indentation
- `tab_width`: optional property that defers to `indent_size` when not set
- `end_of_line`: line ending style (lf, cr, crlf)
- `charset`: character set to be used
- `trim_trailing_whitespace`: remove any whitespace before newline characters
- `insert_final_newline`: ensure a file ends with a newline
- `root`: should be the first instruction outside of any sections and tells the editor to use the `.editorconfig` file and stop searching for others

So far we've touched on a lot of the aspects of EditorConfig in general, but now we're going to take a look at how we can leverage EditorConfig to apply code style and formatting preferences to our C# code.

## Using EditorConfig with C\#

As we begin to look at using an EditorConfig specifically for .NET projects, it's important to note that any additional properties supported for .NET need to be implemented by the editor, IDE, or compiler. Many of the EditorConfig properties that are specific to .NET are even enforceable at build time. To my knowledge, .NET-specific code style properties included in the `.editorconfig` file are supported in Visual Studio, VS Code (via the OmniSharp extension), and Rider.

In order to take advantage of all the .NET code style features in VS Code, we'll need to make sure we have a couple of things configured in the settings. First, we'll want to make sure the C# [extension](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp) is installed. If you've been writing C# in VS Code already, then you most likely have this installed already. With that installed we'll want to go to the `settings.json` file and make sure the following lines are included. This will make sure the OmniSharp extension is set up to use all of the features and styles included in the `.editorconfig`.

```
{
  "omnisharp.enableRoslynAnalyzers": true,
  "omnisharp.enableEditorConfigSupport": true
}
```

The additional code style properties available for .NET projects relate to language rules, formatting rules, and naming rules. We'll take a quick look at each of these sub-categories to see what is available for us to define in an `.editorconfig` for .NET.

## .NET Language Rules

The language style rules can be broken up into three categories. The .NET language rules apply to all languages, whereas the other two are specific to C# and VB.NET respectively.

1. .NET Language Style Rules (`dotnet_style_` prefix)
2. C# Language Style Rules (`csharp_style_` prefix)
3. VB.NET Language Style Rules (`visual_basic_style_` prefix)

The language rules are formatted like `option_name = value[:severity]` with `severity` level being an optional part of the format. Some example values for these rules would be `true`, `false`, or `never`.

Without explicitly going through each rule that can be applied for each category, these rules can be summarized as affecting the language constructs like modifiers, keywords, parenthesis, etc. To see a full list of all the different rules available see the docs [here](https://docs.microsoft.com/en-us/dotnet/fundamentals/code-analysis/style-rules/language-rules#net-style-rules).

## .NET Formatting Rules

The formatting rules are relatively similar to the language rules discussed previously, except they affect how indentation, spaces, line endings, line breaks, etc. are used in a .NET language. The formatting rules category only has two sub-categories, .NET Rules and C# Rules. The .NET rules are language agnostic (under the .NET CLR) and the C# rules are specific to the language.

The .NET rules available are scoped to `using` directives and `Import` statements (responsible for referencing fully-qualified namespaces) and namespaces. All other rules in this section are defined specifically for C#. Many of the C# specific rules revolve around new lines (for example with conditional statements or around curly braces), spacing (before or after punctuation/keywords), indentation and wrapping.

The format for these formatting rules is similar to that of the language rules, except there is no option to define a severity level.

```
; true and false are common values
rule_name = value
```

For a full list of all the formatting rules check out the documentation [here](https://docs.microsoft.com/en-us/dotnet/fundamentals/code-analysis/style-rules/formatting-rules).

## .NET Naming Rules

Naming rules are the final category of .NET specific EditorConfig properties and it may be the most complex. With naming rules, we are able to define how .NET code elements (like classes, properties, fields, methods, etc.) should be named. Each naming rule contains three parts.

1. **Symbol Group**: Group of code elements the rule will be applied to like static or private fields
2. **Naming Style**: The specific style to enforce like casing or beginning with an `_`
3. **Severity**: The severity to which the rule should be enforced

The general syntax to follow for naming rules is as shown below.

```
<kind>.<title>.<propertyName> = <propertyValue>
```

There are many different options to apply to naming rules and going through them individually in the blog post would be redundant. I think it's best to take a look at a good example, and then for more exploration, the documentation for all naming rules can be found [here](https://docs.microsoft.com/en-us/dotnet/fundamentals/code-analysis/style-rules/naming-rules).

In this example, we'll be defining a naming rule to enforce a rule that private members of a class should be prefixed with an underscore `_`.

```
# Instance fields are camelCase and start with _

# This section defines the naming rule properties and severity
dotnet_naming_rule.instance_fields_should_be_camel_case.severity = suggestion
dotnet_naming_rule.instance_fields_should_be_camel_case.symbols = instance_fields
dotnet_naming_rule.instance_fields_should_be_camel_case.style = instance_field_style

# This is the symbol group
dotnet_naming_symbols.instance_fields.applicable_kinds = field

# This is the naming style
dotnet_naming_style.instance_field_style.capitalization = camel_case
dotnet_naming_style.instance_field_style.required_prefix = _
```

The EditorConfig is a powerful tool to help keep codebases consistent and clean. As we've seen in this post the .NET ecosystem provides a number of features on top of the default EditorConfig rules to allow us to control just about every piece of code we write.