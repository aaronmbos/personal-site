---
id: 38
slug: daily-init-script
title: "Creating a Daily Init Script"
description: In this post, we're going to explore the concept of a daily init script. The goal of this script is to open all of the necessary applications and tools that we use on a daily basis. This allows us to be productive by default instead of having to make separate decisions about what tools we need to accomplish a given task. I've been using some form of an init script for a few years now and I hope to share why I find it so useful.
publishedAt: 2022-05-21T01:36:59.181Z
updatedAt: 2022-05-23T03:43:12.567Z
metadata: dev,tools
---
## What is a Daily "Init Script"?

An init script is a fancy way of describing a bit of code that is responsible for starting applications automatically. The alternative to using an automated script would be to open up each application or tool individually. For me, the daily init script is something that I run immediately when I log on to my computer in the morning. I've defined a small set of applications and tools that I use on a daily basis, which are then included in my script.

I think it is also worth noting that I have gotten into the habit of closing all of my running applications at the end of every workday. I do this for a couple of reasons, but mostly because it provides a mental cue that my workday is done and it's time to transition into another area of my life, like being the best dad and husband that I can be. This makes my daily init script even more valuable because without it I would have to open up each application manually every day (most likely at the time that I needed to use it).

There is a quote that I found several years ago that has stuck with me and prompted me to continue the habit of ending each day with a clean slate.

> Yesterday's home runs don't win today's game. -- Babe Ruth

I really like this quote because it is a reminder that each day is another opportunity to do something important. Just because we did something on a previous day does not mean that we don't need to show up today. Now that you know a little bit about what a daily init script is, let's take a look at what problems it can solve for us.

## Benefits of a Daily Init Script?

Before we jump into actually creating an init script for daily use, I'd like to quickly look at some of the benefits that I think it can provide. If you're someone who doesn't normally close all of your applications at the end of each day, I would recommend giving that a shot. It helps me immensely in the transition from work mode to normal life mode. This list of benefits is obviously opinionated, but I think they would apply well to anyone who adopted the use of an automated script to start your applications for the day.

- Daily tools and applications are open and ready to use immediately
- Reduces the number of decisions that need to be made in order to start being productive
- Can be created to run on different platforms (macOS, Linux, Windows)
- Start each day with a blank canvas to do your best work

Without further adieu let's take a look at how we can set up a daily script to provide the benefits that we just discussed.

## Creating an Init Script

I'd like to preface this section by saying that there are many different ways to go about this script and my method is just one of them. Please feel free to copy, tweak, or completely ignore my approach. What works perfectly for me may not work for you. If anything, I hope that you try out some form of a daily script to start the necessary tools and apps to be productive each day.

I do all of my current development on Windows for my day job, so Powershell seemed like a logical choice for my script. If you're on macOS or Linux, you could use Bash. If you'd like something that runs on any OS, you might choose Python (Powershell is cross-platform now, but I think Windows is still the most widely adopted platform). My approach involves two files.

1. A text file with line delimited locations to application executables
1. The actual script responsible for reading from the text file and starting each executable

To start let's talk about where to store the files. I like to store my script in a directory called `scripts` typically with other code that I have stored on my machine. My script expects the text file to be called `apps.txt` and for it to be located in the same directory as the script itself. Next, we have the actual script file which I name `init.ps1`. Since I'm using Powershell, the file extension is `.ps1` and that will be dependent on the language you choose to write your script in.

```
scripts/
|- apps.txt
|- init.ps1
```

The `apps.txt` file may look something like this.

```
"path/to/the/executable/postman.exe"
"path/to/the/executable/Rider.exe"
"path/to/the/executable/code.exe"
etc...
```

With the text file in place, we are now ready to write our script. With Powershell, we can do this in a single line, but it may be different depending on your language of choice.

```
Get-Content -Path .\apps.txt | ForEach-Object {Start-Process -FilePath $_}
```

As you can see `\` is used to reference the `apps.txt` as this file runs on Windows. This script works by piping the result of `Get-Content` into the `ForEach-Object` which then runs the given executable for each line of the text file. I would recommend creating an alias in your shell of choice to quickly run the script. For example, I have an alias to just enter `i` in my terminal to run the init script. That's all there is to it, you now have a repeatable way to start your day quickly and productively!
