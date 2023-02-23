---
id: 64
slug: ffmpeg-command-anatomy
title: "The Anatomy of an FFmpeg Command"
description: "FFmpeg can do just about anything a user tells it to when it comes to video and audio processing as long as they know what to ask. In this post, we're going to break down the different aspects of an FFmpeg command in an effort to better understand how FFmpeg processes them."
publishedAt: YYYY-MM-DDTHH:MM:SS.000Z
updatedAt: YYYY-MM-DDTHH:MM:SS.000Z
metadata: dev,tools,video,ffmpeg
---

When it comes to comprehensive command-line tools, FFmpeg definitely ranks among the top in terms of popularity and usage. FFmpeg was released in 2000 and has since become a household name in the video and audio processing industries. If you've had any experience with FFmpeg, you'll most likely know that as a tool it is both broad and deep. The breadth of functionality ranging from video to audio along with the depth of being able to decode, encode, transcode, mux, demux, stream, and filter media makes it a powerful, but potentially daunting tool. The good thing for users is that the documentation is comprehensive and complete, but due to the sheer magnitude of functionality it may be difficult for newcomers to digest. That's why I'd like to take a step back and see if we can break down this complex tool into some core fundamentals that provide a platform for learning more in the future. Let's start with the command specification.

## The FFmpeg Command

If you've worked with command-line applications before then the FFmpeg command structure may not be too surprising. With that being said FFmpeg comes with a long list of possible options and flags that can be quite challenging to understand. For this reason I think it's best to start with the general structure of an FFmpeg command.

```
ffmpeg [global_options] {[input_file_options] -i input_url} ... {[output_file_options] output_url} ...
```

The first piece of the command `ffmpeg` is the entry point to the FFmpeg executable. Unless you've modified the name of the executable or have an alias set up to call the FFmpeg executable this value will be consistent no matter where you're running the command.

### Global Options

The next group of options to cover are the **optional** `global_options`. The global options are meant to be applied to the command as a whole, rather than targeting specific streams and input or output files. The global options should be the first set of options included in the command before defining any input/output files and options. I won't define a comprehensive list of all the global command options available, but I think a great example of a global option is `-filter_complex`, which defines a complex filter graph (we'll touch on this briefly in a later section) that is applied globally to all streams/files that it is intended to process. 

If you'd like to see more examples of global command options head over to the [documentation](https://ffmpeg.org/ffmpeg-all.html) and search for "(global)". This search results should include most global options as they are denoted with "(global)" in their definitions.


