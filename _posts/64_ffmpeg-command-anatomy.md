---
id: 64
slug: ffmpeg-command-anatomy
title: "The Anatomy of an FFmpeg Command"
description: "FFmpeg can do just about anything with video and audio processing as long as you know what to ask. In this post, I will break down the different aspects of an FFmpeg command to better understand how FFmpeg processes them."
publishedAt: 2023-02-28T23:59:59.000Z
updatedAt: 2023-02-28T23:59:59.000Z
metadata: dev,tools,video,ffmpeg
---

When it comes to comprehensive command-line tools, FFmpeg definitely ranks among the top in terms of popularity and usage. FFmpeg was released in 2000 and has since become a household name in the video and audio processing industry. If you've had any experience with FFmpeg, you'll most likely know that as a tool it is both broad and deep. The breadth of functionality ranging from video to audio along with the depth of being able to decode, encode, transcode, mux, demux, stream, and filter media makes it a powerful, but also a daunting tool. The good thing for users is that the documentation is comprehensive and complete, although due to the sheer magnitude of functionality, it may be difficult for newcomers to digest. That's why I'd like to take a step back and break down this complex tool into some core fundamentals that provide a platform for learning more in the future. Let's start with the command specification.

## The FFmpeg Command

If you've worked with command-line applications before then the FFmpeg command structure may not be too surprising. With that being said FFmpeg comes with a long list of possible options and flags that can be quite challenging to understand. For this reason, I think it's best to start with the general structure of an FFmpeg command.

```shell
ffmpeg [global_options] {[input_file_options] -i input_url} ... {[output_file_options] output_url} ...
```

The first piece of the command `ffmpeg` is the entry point to the FFmpeg executable. Unless you've modified the name of the executable or have configured an alias to call it, invoking the FFmpeg executable will be consistent no matter where you're running the command. In its simplest form, FFmpeg is a program that accepts one or more inputs, processes those inputs, and produces one or more outputs. I found the FFmpeg "API" to be quite composable once I was able to grasp the high-level command structure.

### Global Options

The next group of options to cover is the **optional** `global_options`. The global options are meant to be applied to the command as a whole, rather than targeting specific streams or input/output files. For this reason, global options can only be included in a command once. The global options should be the first set of options included in the command before defining any input/output files and options. I won't define a comprehensive list of all the global command options available, but I think a great example of a global option is `-y`, which indicates that output files should automatically overwrite existing files if they exist.

If you'd like to see more examples of global command options head over to the [documentation](https://ffmpeg.org/ffmpeg-all.html) and search for "(global)". The search results should include most global options as they are denoted with "(global)" in their definitions. Now we'll move on to the input file and its options.

### Input Options

As I mentioned before, FFmpeg accepts **one or more** input files as part of a command. The input file is denoted with the `-i` flag. It is best to include all input files immediately after global options before any output options or files are included.

```shell
ffmpeg -i input.mp4 -r 30 output.mp4
```

When dealing with input (and output for this matter) options order is important because by default the options will be applied to the next file in the command. For example, the command below accepts two input files. The `-ss` option seeks to the specified position in the input file, which is included twice in the example to seek to different times in each input file. The command itself will result in two gifs being created with the specified length of 5 seconds (`-to 5`) a framerate of 10 fps (`-r 10`) and resized output (`-vf scale=200:-1`).

```shell
ffmpeg -ss 00:00:05 -i input1.mp4 -ss 00:00:01 -i input2.mp4 

# The rest of the command is related to the output
-to 5 -r 10 -vf scale=200:-1 -map 0 output1.gif -to 5 -r 10 -vf scale=200:-1 -map 1 output2.gif
```

Input options are a little less common than output options because typically the goal is to process the unmodified input, but understanding how to set up input files and options will be helpful for the next topic of output files and their options.

### Output Options

The output file URL and its options are structured similarly to their input counterparts with the difference being that they affect the result of the command instead of the input. It is important to remember that order matters with respect to options as they relate to multiple files. Options will only apply to the next file that is listed in the command.

If we continue to look at our example from the input commands, we'll notice that we have to specify the output options twice, once for each output file. Command options can be used twice in the same command as long as they are not used twice on the same file. We also include the `-map` option using the zero-based index of the input files to select which input the output options should be applied to.

```shell
ffmpeg -ss 00:00:05 -i soccer.mp4 -ss 00:00:01 -i soccer.mp4 

# Output options for the first output file (and first input file)
-to 5 -r 10 -vf scale=200:-1 -map 0 output1.gif 

# Output options for the second output file (and second input file)
-to 5 -r 10 -vf scale=200:-1 -map 1 output2.gif
```

Many output options are quite specific to the task at hand. For example, transcoding to fmp4 will require a set of output options completely different than transcoding to DASH. For that reason, I want to avoid going into too much detail about specific options. If you are needing information about a certain task I highly recommend checking out the official documentation.

## FFmpeg Command Workflow

So far this post has mostly been about the format and structure of FFmpeg commands. Before wrapping up I did want to touch on the general transcoding pipeline that FFmpeg uses. I'll be upfront in saying that this isn't anything unique or hard to find as there are quite useful diagrams in the FFmpeg documentation. With that being said I'd like to touch on the phases of the pipeline and give a little bit of context on what each is responsible for.

1. Demux the input into encoded data packets
1. The decoder decodes each packet into frames
1. The encode encodes each frame into the encoded data packets
1. Mux the encoded data packets into the necessary format specified by the output file

Each stage of the pipeline has a responsibility in the transcoding process.

1. Demultiplex (demux)
    - Responsible for separating the input file(s) into packets
2. Decode
    - Converts the demuxed packets into the raw media (video, audio, subtitles) format
3. Encode
    - Convert the raw media that was decoded into the format required by the output format
4. Multiplex (mux)
    - Package up all of the encoded packets into the necessary output file(s)

While this is a simplistic and reduced example, I think it covers the general process pretty well. There are obviously more complex workflows that involve filter graphs or other operations, but those are much more nuanced and specific to the type of work being done.

In this post, we've covered the FFmpeg command structure and general processing workflow. With all of this information in hand, you should be ready to take on more complex scenarios with confidence.
