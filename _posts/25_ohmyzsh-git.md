---
id: 25
slug: ohmyzsh-git
title: "Know Your Tools: Oh My Zsh and Git"
description: As developers, we are exposed to many tools. How we learn and use those tools can make a big difference in our productivity and happiness. In this post, we'll be looking at the git plugin for Oh My Zsh and how it can be leveraged to increase our productivity using Git in the terminal.
publishedAt: 2022-01-07T01:26:08.942Z
updatedAt: 2022-01-07T01:43:09.329Z
metadata: dev,learning,git,tools
---
## Zsh and Oh My Zsh

Before we get too far into using the git plugin with Oh My Zsh, let's make sure we are on common ground with the basics. First, Zsh is a UNIX command-line interpreter or shell. It has a lot of added functionality compared to a standard shell, like Bash, and is great for scripting. Zsh replaced Bash as the default terminal shell on macOS in 2019. To learn more about Zsh check out the introduction [documentation](https://zsh.sourceforge.io/Intro/intro_toc.html).

Second, Oh My Zsh is an open-source framework built to make working with Zsh easier and more productive. Oh My Zsh provides a lot of great functionality out of the box but is also very customizable. Chances are if Zsh doesn't do something, then there is already a plugin for Oh My Zsh that does it. If not, Oh My Zsh was created in a way that allows us to add the functionality ourselves by adding or extending plugins. The git plugin and its functionality will be the main focus for the rest of this blog post.

Now would be a great time to install Zsh and/or Oh My Zsh if you haven't already to make sure you get the most out of the rest of this post.

- [Zsh installation](https://github.com/ohmyzsh/ohmyzsh/wiki/Installing-ZSH#install-and-set-up-zsh-as-default)
- [Oh My Zsh installation](https://zsh.sourceforge.io/Intro/intro_toc.html)

## Using the Git Plugin

Git is a very powerful command-line tool, but repeatedly typing verbose commands and options into the terminal can be time-consuming. This is where the Oh My Zsh git plugin comes in. The git plugin for Oh My Zsh provides many useful aliases and functions for common command/option combinations. Before we get a look at any functionality we need to make sure it is enabled in our Oh My Zsh configuration.

All Oh My Zsh plugins can be managed in the `.zshrc` file, which is typically located in the `$HOME` directory. We can open and view the `.zshrc` file with the following command.

```
vi ~/.zshrc
```

With the file open, we'll be looking for a line that begins with `plugins=`, which is the configuration key responsible for telling Oh My Zsh what plugins should be enabled. For example, the value of the plugins key may look something like this. You'll notice that each plugin is delimited with whitespace (spaces, tabs, newlines).

```
plugins=(git dotenv macos)
```

With the git plugin enabled we're ready to take a look at some of the aliases and functions provided.

## Git Command Aliases

At the time of writing the Oh My Zsh plugin includes 177 different aliases for git commands. There's a good chance we'll never need to learn ALL of these aliases, but I find some of the more common ones very useful for commands that I run several times a day. We'll be looking at a quick summary of the aliases that I find most handy, but you can view the full list [here](https://github.com/ohmyzsh/ohmyzsh/blob/master/plugins/git/README.md#aliases). The majority of the aliases function as you'd expect them to in terms of accepting arguments. For example, `ga .` is equivalent to running `git add .`.

- `g`: `git`
- `ga`: `git add`
- `gb`: `git branch`
- `gba`: `git branch -a`
- `gcam`: `git commit -a -m`
- `gcb`: `git checkout -b`
- `gcmsg`: `git commit -m`
- `gco`: `git checkout`
- `gd`: `git diff`
- `gf`: `git fetch`
- `gpsup`: `git push -u origin $(git_current_branch)`
- `gl`: `git pull`
- `gloga`: `git log --oneline --decorate --graph --all`
- `gm`: `git merge`
- `gp`: `git push`
- `gpf!`: `git push --force`
- `grb`: `git rebase`
- `grbm`: `git rebase $(git_main_branch)`
- `grbi`: `git rebase -i`
- `grs`: `git restore`
- `gst`: `git status`
- `gss`: `git status -s`

The list above is not exhaustive, but I think it gives a good summary of common commands. While it may take some time to change our muscle memory from the full git commands to these aliases, it's important to think about the number of keystrokes that these aliases are saving over time. If you're wondering why saving keystrokes is important, check out this [website](https://keysleft.com/) by Scott Hanselman for a quick explanation.

## Functions for Git

In the above commands, you may have noticed a couple of tokens like `current_branch` and `git_main_branch`. These are functions provided by the Oh My Zsh git plugin. While there are not near as many functions as there are aliases, they are still powerful. The full list of functions can be found [here](https://github.com/ohmyzsh/ohmyzsh/blob/master/plugins/git/README.md#functions).

The two functions listed above are pretty apparent by their name. The `current_branch` function will echo the currently checked out branch, while the `git_main_branch` will echo the `main` branch. These functions may seem basic, but they are most useful for creating our own git command aliases or scripts. I think the function that I find most useful is `grename <old> <new>`, which renames a branch from `<old>` to `<new>` on both local **and** origin remote. I have to Google this every time I need to do it before learning the function 😅.

Learning tools as developers can be overwhelming at times, but if we take the time to master the tools used day in and day out they can become a superpower instead of kryptonite.
