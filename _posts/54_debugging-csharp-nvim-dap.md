---
id: 54
slug: debugging-csharp-neovim-nvim-dap
title: "Debugging C# in Neovim with nvim-dap"
description: "As a software developer debugging skills are invaluable. Over the years debugging tools have evolved to become an integral part of the development toolbox. In this post, we are going to look at how we can configure a debugging experience for .NET code in Neovim. Let's dive in!"
publishedAt: 2022-10-31T01:10:00.000Z
updatedAt: 2022-10-31T01:10:00.000Z
metadata: dotnet,csharp,neovim,tools
---

Over the past few months Neovim has become my go to editor for all of my free time/side project coding needs. There have certainly been hurdles to overcome, but I really enjoy the experience and coding environment that Neovim provides. As I've continued to expand my Neovim understanding and environment configuration, I've been looking for more and more ways to integrate Neovim into my .NET development workflow. I've written a couple posts about .NET development in Neovim. One for general environment setup and another for Roslyn/.editorconfig integration. If you don't have your local development environment for Neovim setup yet, I would highly recommend checking out those posts. With all of that in place we should be ready to configure Neovim for the ability to run our application with a debugger.

First, I think it's valuable to talk about the plugin that makes this all possible. The only plugin that we need to install for debugging in Neovim is nvim-dap. I would highly recommendation reading more about nvim-dap on the GitHub repo, but at a very high level nvim-dap is a debug adapter protocol client implementation for Neovim. Nvim-dap provides the ability to run an application with a debugger, add breakpoints, step through code, inspect scopes, and much more. Neovim 0.8.0 is the recommended version for using nvim-dap, but the nightly build and 0.7.2 are also supported. Nvim-dap is a generic implementation than can plug into almost any debugger that follows the standard protocol. For the purpose of this post we are going to be focused on the use of nvim-dap for debugging .NET applications. Let's start with a list of steps that need we'll be going through.

1. Install nvim-dap plugin
1. Install netcoredbg
1. Configure nvim-dap to use netcoredbg
1. Install dapui
1. Configure dapui for ease of use
1. Debug our apps 😎

## Install nvim-dap

## Install netcoredbg

## Configure nvim-dap

## Install dapui

## Configure dapui

## Debugging demo
