---
id: 24
slug: 2021-year-review
title: "What I've Learned in a Year of Blogging"
description: In January 2021 I created this blog without any expectations of what would come of it. I had a plan but wasn't sure I'd be able to execute it. In this post, I'll take a moment to reflect and look back at this year going over what I've learned, what went well, and what didn't go so well, as well as take a look ahead at next year to see how I can improve.
publishedAt: 2021-12-29T04:40:42.322Z
updatedAt: 2021-12-29T04:59:10.421Z
metadata: review,learning,growth
---
## How It Started

The past two years have felt like a blur. There have been a lot of changes for me personally and throughout the world in general. At the beginning of 2021, I wanted to try something new and exciting, which is what led to this blog. I'm someone who can't stand being static. I enjoy the challenge of pushing myself and trying to grow in all aspects of my life. Lucky enough for me software development is a great career (and hobby) to scratch that itch. There is always something to learn and improve upon. Last December I was starting to feel a bit stagnant in terms of what I was learning and wanted to put myself outside of my comfort zone a bit. Coincidentally I was also reading the [Coding Career Handbook](https://www.learninpublic.org/) by [Shawn Swyx Wang](https://twitter.com/swyx), which introduced me to the concept of "learning in public". The book is full of a ton of great content, but learning in public really resonated with me for a few reasons.

1. Writing about what you're learning helps information "stick" better.
2. By learning in public you are able to help others who are in similar situations as yourself.
3. Simply putting my thoughts in public raises my standards because I want readers to feel confident that the content is accurate and up to date.

So I started this blog in January of this year (2021). I also made it a point that I wanted to create the blog myself as part of my learning journey. I set a goal to finish up the site by the end of January, which I accomplished. In fact, I published two posts in that first month which set me in motion for the rest of the year. The best piece of advice that I read prior to starting my blog was a quote from [Jeff Atwood](https://twitter.com/codinghorror), author of the [Coding Horror](https://blog.codinghorror.com/) blog and co-founder of Stack Overflow.

> When people ask me for advice on blogging, I always respond with yet another form of the same advice: pick a schedule you can live with, and stick to it. Until you do that, none of the other advice I could give you will matter.

*Picking a schedule you can live with* is exactly what I did. My schedule for 2021 was to blog twice a month. Typically I would publish around the 15th and end of each month. I was able to stick with that cadence, which gave me the confidence to keep moving forward. This blog started as a small project with unclear expectations, which led to a lot of learning over the year.

## What I've Learned

Writing blog posts is a process. Everyone's process is probably unique, but none the less there is still a process. My process starts with coming up with ideas for blog posts. Before starting this blog I didn't think I would have any trouble coming up with topics for posts, but I was wrong. After publishing my first few posts, I felt a little rushed to come up with content for the subsequent posts. Early on I noticed that topics that came up at the last minute resulted in posts that felt lower quality or rushed. This is when I learned to **start a document to track post topic ideas**. The way I use this document is by adding to it the moment I think of a blog post idea. This is helpful because it means I won't forget, but also because it gives me some time to think about whether or not that topic will be something worth writing about. Having a healthy backlog of ideas to pull from when needed goes a long way in creating content that doesn't feel rushed.

Another thing that I've learned over the course of this year is that **writing about a topic that has purpose** is much easier than a topic that is just interesting. For example, two of my most popular posts this year were [Querying JSON Data in PostgreSQL](https://aaronbos.dev/posts/query-postgresql-json) and [Updating JSON Data in PostgreSQL](https://aaronbos.dev/posts/update-json-postgresql). Both of these posts were written because I was working on a project at work that involved moving around a lot of JSON data in a Postgres database. While working on the project I noticed that (1) there wasn't a lot of quality information about working with JSON in PostgreSQL outside of the documentation and (2) I wanted to understand the core concepts better than I did at the time. This gave me the incentive to dive into the documentation and learn how to efficiently manage JSON data in PostgreSQL, which I believe led to higher quality blog posts.

The final learning that I'd like to highlight is a realization that I had after publishing a handful of posts. I learned that **writing the blog posts for myself** and not for a particular audience is key to sustaining success. Before publishing my first few posts I was so nervous to click the 'Publish' button. I was worried that someone who is smarter and more knowledgeable than me may read my post and humiliate me for it. After a while, I realized how detrimental this was to my confidence and my eagerness to write blog posts. If I spend the whole time writing a post worrying what others will think of me, then I honestly lose focus on why started doing this in the first place..**To Learn.** If I publish a post that someone doesn't agree with, then I hope they can explain or teach me a better way. In which case I will be happy to learn from them. Ultimately I blog because I enjoy the process of learning and potentially being able to help someone who comes across my posts looking to learn or solve the same problem that I encountered.

## Looking Ahead to 2022

Looking back at my blog in 2021 I'm happy with how it progressed and what I learned. It's gratifying to look at my site analytics and see my posts being viewed a couple of hundred times per day (most views coming from a handful of the same posts). Even though this year went well, I still have some ideas for what I'd like to improve upon in 2022.

### Increase Post Frequency

At the beginning of 2021, I was a little hesitant about setting my cadence for publishing posts. I didn't want to be too ambitious setting myself up for failure, but I also didn't want to be too conservative and become bored by the idea of writing posts. I think settling on two posts per month for the first year was a solid target and one could (and did) achieve. With that being said, I'd like to increase my blog post cadence goal to **three posts per month**. It's a 33% increase in published posts, which will require a bit more effort and preparation on my part. Overall I think this goal will help me become a better writer while also allowing me to potentially reach a wider audience by way of more blog posts.

### Incorporate Wider Range of Topics

Most of my blog posts in 2021 were focused on C#, SQL, or general development topics. Next year I'd like to expand the scope of topics to include a few more of my interests. Being a backend-focused engineer my posts will probably always lean towards backend-focused technology, but I would like to sprinkle in a few more posts about frontend technology, books that I've read, or general (engineering-focused) problem-solving. I don't want every post to be on a different topic, but I'd like to implement a few series of posts that focus on a particular technology or problem. That way I can organize my learning and also make it easier for readers to keep track of what they might be interested in.

### Site Improvements

One of the things that I am most proud of is my blog site itself. The site is statically generated using NextJS and hosted on Vercel. I decided to design and style the site myself using TailwindCSS. The content is hosted on Strapi (lives on a Heroku dyno using a Postgres database) and the media is hosted on Cloudinary. There are quite a few moving pieces, which can require some maintenance from time to time. I resisted the urge of making tweaks to the site itself in favor of focusing on writing blog content. I have seen posts on Reddit or Twitter from developers falling into the trap of overhauling their blog site instead of actually publishing content. This was a trap that I did my best to avoid. With that being said there are some aesthetic improvements I'd like to make in 2022.

1. Dark mode theme toggle. This is purely aesthetic, but I love dark mode in all my apps. (Q1)
2. Ability to share a blog post on Twitter directly from a post. (Q2)
3. React to posts with emojis. (Q3)
4. Search posts based on tag, title, content. (Q4)

As you can see I've marked each feature with the quarter that I'd like to implement them in. This may not seem like a lot to accomplish in a full year, but as I mentioned before I'd like to keep my focus on the publishing posts over making changes to my blog site.

The past couple of years have been challenging for everyone in many different ways. I'm thankful that I've been able to spend time with those who mean the most to me, while also pursuing my many passions. While I've highlighted a lot of great things from 2021, I'd like to call out that it wasn't always easy. Sometimes we need to take a step back and take some time for ourselves to relieve stress or pressure.

If you've read this post or **any** of my posts for that matter, thank you. Like I mentioned earlier, I mostly blog for myself but I'd be lying if I said that nice comments here and there didn't help me kick on when things got tough. I'm looking forward to the excitement and challenges that the future has in store. See y'all next year!