---
id: 60
slug: 2022-year-in-review
title: "Looking Back at 2022 and Ahead to 2023"
description: "As the calendar year comes to a close, I'll take a moment to reflect on the posts and site improvements this year and also provide a sneak peek at what will be coming in 2023. Let's dive in!"
publishedAt: 2023-01-01T02:30:00.000Z
updatedAt: 2023-01-01T02:30:00.000Z
metadata: reflection,growth,musings
---

For me, the end of the year is always an exciting time. It is a natural time to take a step back and reflect on the last 12 months. I also like to use this time to set goals and expectations for the upcoming year, which creates a cycle where I can review my progress and adjust expectations on a consistent schedule. Given that this is a technical blog I'm going to keep this post focused on the posts and work that I've done over the past year and also plan to do in the coming year.

## Reflecting on Posts in 2022

In 2022 I published 36 blog posts (including this one), which is 12 more posts than I wrote last year. This means that I accomplished my target of publishing three posts per month (on average). I've had a bit of time to reflect on this post cadence and there were definitely times during the year when my posts felt a bit rushed. This may not have been solely due to the cadence, but also due to external factors (life, job change, etc.). In contrast, my 2021 goal was to publish two posts per month and I don't recall feeling so many instances of last-minute posts. I'll be revisiting post cadence when looking ahead to 2023.

After reviewing all of the posts that I wrote this year, I think they can mostly be grouped into three main categories.

1. Documenting my process of learning TypeScript
1. Mastering the local development experience with VS Code and Neovim
1. Grab bag topics that involved language features or personal experience

While I'm proud of the posts that I wrote this year, I feel like many of them lacked a bit of depth. I think this was partially due to the increased cadence, but also to a lack of planning on my part. Given that I planned to post three times in a month I could have been much more forward-thinking in breaking down a topic and providing valuable depth over the course of multiple posts. What ended up happening was that I jumped from topic to topic with little cohesion. This isn't all bad since I don't really want my posts to be reliant on each other. You should be able to jump into any post and gain value without the requirement of reading a previous post (although knowledge from a previous post _can be helpful_).

In my recap [post](https://aaronbos.dev/posts/2021-year-review) from last year, I mentioned that I wanted to cover a wider range of topics beyond C#, .NET, and SQL. I definitely accomplished this by covering TypeScript, JavaScript, C#, Neovim, VS Code, and personal thoughts/opinions. Ultimately I'd like to continue this variety while providing more depth in each post.

## 2022 Feature Roadmap Review

Beyond the goals that I set for myself last year, I also planned to make a number of improvements to this site, which we're encompassed in a "[roadmap](https://github.com/aaronmbos/personal-site#feature-roadmap)". The roadmap included the following:

- Implement dark mode | **Q1** | [PR](https://github.com/aaronmbos/personal-site/pull/1)
- Share directly to Twitter from post | **Q2** | [PR](https://github.com/aaronmbos/personal-site/pull/2)
- TypeScript migration | **Q2** | [PR](https://github.com/aaronmbos/personal-site/pull/3)
- React to posts with emojis | **Q3** | [PR](https://github.com/aaronmbos/personal-site/pull/4)
- Search blog posts | **Q4** | [PR](https://github.com/aaronmbos/personal-site/pull/14)

I'm happy to say that I accomplished each of these milestones on time. A big contributor to my success in accomplishing these features was using the mini-roadmap as a guideline for me to stay focused throughout the year. I didn't want to fall into the trap of tinkering with my blog site while not actually producing content. At the same time, the features that I included in the roadmap were valuable enough for me to prioritize over the course of the year. I'm going to continue to remain focused on generating quality content, while also not losing sight that this blog is a project for me to improve my software development skills, which does involve making incremental improvements to the site itself.

Overall I'm generally happy about the way 2022 transpired in the context of both blog posts and site improvements. The whole point of this blog is to continuously learn new things, which I think I accomplished this year.

## Goals for 2023

With 2022 just about in the rear-view mirror it's time to take a look ahead to 2023 to share my goals and expectations in regard to my blog and learning throughout the year. Ultimately I don't expect too many things to change from the previous two years since I'm overall happy with the progress I've made. In terms of changes for this blog specifically, I will be doing a couple of things differently.

1. Post cadence with go from three to **two posts per month**
1. Incorporate book reviews as regular or additional posts

In 2021 I completed two posts per month, which felt like a reasonable pace for my first year of blogging. As I mentioned previously my goal for 2022 was three posts per month, which I accomplished. I've decided to drop the cadence back down to two posts per month for a few reasons. First, I feel like writing two posts per month allows me a bit more time to research and go into more depth on topics that I'm interested in. Secondly, posting once every ten days may not seem like a lot, but it doesn't leave much room for working on other things throughout the month. Finally, I don't want to feel rushed or pressured to get to the next post. I'd like to move at a more comfortable and sustainable pace. With all of this being said, if I find myself with additional things to blog about I won't hesitate to throw in an extra post during a month.

With a more comfortable posting cadence, I plan to do more reading this year. My book reviews will all be focused on software-related topics like computer science, software architecture, career advancement, etc. I enjoy reading about all of these topics but have failed to get my thoughts and opinions into the blog over the last two years. These book review posts may be part of the regular two-post-per-month cadence or they may be additional. It will most likely be handled on a case-by-case basis depending on what I have in the hopper at each point in time.

## 2023 Feature Roadmap

Like 2022, I plan to follow a quarterly roadmap for site improvements this year. I'm won't be implementing any earth-shattering updates, but I'm excited to polish up a few aspects of the site that have been in need of some attention as the number of posts on the site has grown.

- Framework upgrades | **Q1**
- Migrate posts from markdown files to database | **Q2**
- Improve search experience | **Q3**
- Add pagination to posts page | **Q4**

In quarter one I'm going to be updating the frameworks and dependencies that my blog uses to their latest versions. I'm currently using NextJS 12 and React 16, but I'd like to get on the latest versions for all of my dependencies so that I can take advantage of any new features.

In quarter two I'm going to migrate my posts from markdown files to a database. This could be a bit of a lift considering that I'll need to set up some tooling for CRUD operations and site builds. I previously had my posts and backend CMS running in Heroku, but when they removed their free tier I decided to pull the posts into the git repo temporarily. I never viewed this as a long-term solution, but more so to make sure I didn't lose any data when free Heroku dynos were spun down in November of 2022.

In quarter three I'll be working on the search experience. Currently, the search is functional, but not polished. I'll be implementing a few features that improve searches like auto-completion and result pagination. These features could have been added at the time of release, but I didn't think they were necessary to get the bits deployed and in use.

Finally, in quarter four I'll be adding pagination to the posts page. This should be relatively straightforward. NextJS has support for SSR (Server Side Rendering), which will be key in setting up the pagination. My hope is that I will be able to reuse some of the pagination work from search result pagination in this as well.

All in all 2023 is shaping up to be an exciting year. If you're a regular visitor to my blog or just happened to land on this post, I just want to say thanks for the support and I look forward to providing another year of interesting and valuable content. Cheers 🍻!
