---
id: 51
slug: vim-keycode-concepts
title: "Learning Vim Keycode Concepts"
description: Since diving into the world of Vim and Neovim, I've felt myself become more comfortable with the tool and its idiosyncrasies. One of the the hurdles I faced early on was understanding the documention for different keycodes. In this post, we're going to cover the common keycodes and the concepts around them. Let's dive in!
publishedAt: 2022-09-30T00:00:00.000Z
updatedAt: 2022-09-30T00:00:00.000Z
metadata: dotnet,csharp,neovim,tools
---

## What are Keycodes?

I've adopted Vim (Neovim and other Vim editor plugins for VS Code and JetBrains) within the past year and the most challenging aspect was learning all of the different keymaps and motions. I will say that I am still learning, but have become pretty efficient with the foundational keymaps and motions in Vim. In my opinion one of Vim's greatest strengths is the robust documentation and manual pages. If you want to learn to do something in Vim, I guarantee it is documented somewhere in the man pages. I'm not going to say the information is always easy to find, but it is available if you're patient enough to search.

The power of Vim comes from the keyboard. The navigation and editing experience in Vim is different from almost all modern editors in that it prefers the use of the keyboard over the mouse. This difference in style can lead to a pretty steep learning curve and frustration. For me the frustration early on came from not being able to understand the different keycodes listed in the documentation. For example, when the documentation for performing a specific action references the `<Leader>` or `<C-j>` key, what exactly does this mean? Understanding what these keycodes mean, will allow us to gain more knowledge from the Vim documentation.

## Keycode Reference

In this section we're going to go through several keycodes that aren't immediately obvious (at least to me). Some of the keycodes are pretty self-explanatory, like `<Esc>` represents the escape key and `<Space>` represents the space bar. In the examples you may see characters followed by `...`, which means that the keycode can be combined with other keys to perform an action. For example, we might see something like `<Space>-...` which means that the combination of the space bar and some undetermine subsequent key(s) will define the action.

- <Leader>: The leader key isn't exactly a keycode, but it is often referred to as documentation and provides a lot of flexibility for creating very custom keymap shortcuts.
  - By defaut the leader key is mapped to `\`
- `<CR>`, `<Enter>`, `<Return>`: The enter key (`CR` stands for carriage return)
- `<S-...>`: The shift key
- `<C-...>`: The control key
- `<M-...>`, `<A-...>`: The meta or alt key. On Windows this is alt and macOS this is option.
- `<D-...>`: The command key (macOS only)

This list may seem small and pretty meaningless, but I can assure you that you will come across these keycodes in Vim and Vim plugin documentation. The power of Vim lies in the use of keymaps and shortcuts, so if you can master the fundamentals and understand how to learn from the documentation Vim will be a joy to use.

In the next section we'll take a look at some examples of these keycodes as they are used with certain keymaps and plugins. Since I use Neovim, I'll be providing the examples in both Vimscript and Lua. If you're not familiar with Lua, it is a great scripting language and also the default plugin language for Neovim. Neovim still supports Vimscript, but I've seen more and more plugins created using Lua lately.

## Keycode Examples
