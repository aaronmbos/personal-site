---
id: 3
slug: blog-behind-the-scenes
title: "Behind the Scenes of Making my Blog"
description: The number of options for setting up a blog can be overwhelming. Let's take a look at what worked well for my goals and expectations. 
publishedAt: 2021-02-05T04:49:44.800Z
updatedAt: 2021-02-05T04:49:44.828Z
metadata: dev,web
---
### My Goals
Whenever I set out to complete a personal project I always have two things on my mind. First, am I going to **enjoy** working on the project? If I don't enjoy doing it, then it's going to be difficult to find the motivation in my free time to work on it. Secondly, I need to **learn** something. Whether it be learning something completely new or reinforcing existing knowledge, that is a requirement for me.

So what were my goals for creating this blog?
1. Create the site (with code) and "own" the content. 
2. Statically generate the site using a Jamstack framework (So many great options here).
3. Use as much free software as possible, but with the potential to scale *if needed*.

Let's double-click on each of these goals to touch on my reasoning behind each decision as well as look at the technologies involved.

### Create the Site (With Code) and "Own" the Content
This goal goes hand in hand with both of my requirements for personal projects. Would I have been able to sign up for Medium or WordPress and create a blog in a fraction of the time that it took me to complete this project? *Absolutely*. Would I have enjoyed doing that? *I don't think so*. Would I have been able to reinforce my knowledge of JavaScript, React, Docker, etc.? *Definitely not*. With that being said, I think it's perfectly reasonable for someone to use those platforms for blogging and it even makes sense for a lot of people. I was looking for something that I could maintain and grow with time, add and remove features, make mistakes and learn from those mistakes. Everything that I love about being a software developer wrapped up in a side project.

Before writing a single line of code I had a good idea of how I wanted to create this blog. First, I wanted to use React because I've used it in projects before and I find it enjoyable to work with. Second, I wanted to use TailwindCSS to design the site. I had heard really good things about its utility-based class design and I wanted to see it for myself. Finally, I wanted to have a seamless development and deployment process. I'm hesitant to use the CI/CD terminology here because it seems a little heavy-handed for a single developer working on a side project, but you get the picture. Develop -> Commit -> Deploy.

### Statically Generated Site Using Jamstack
I know what you're thinking, *so many buzz words* 🙄, and I agree with you, but let me explain. 

Let's start with static site generation and why I think it works great for a blog. Creating a static site means that site assets can be served from a simple web server or even a CDN. This seems perfect for a blog that has content that doesn't change frequently, as opposed to hitting a server and potentially a database to render the site on each request.

Next up is [Jamstack](https://jamstack.org/). If you're not familiar with the term, it stands for JavaScript, API, and Markdown. I went this route for a couple of reasons.
1. I am familiar with JavaScript, APIs, and Markdown so it seems like a logical choice.
2. There are some really good options when it comes to Jamstack frameworks and platforms right now.

There are so many different options when it comes to configuring a Jamstack setup and I won't be able to touch on them all here, but I will touch on my blog's stack in particular and some alternatives that I considered.

The first decision I made was choosing the framework to generate the site. I said earlier that I wanted to use React and that led me to [NextJS](https://nextjs.org/) or [GatsbyJS](https://www.gatsbyjs.com/). They're both great options, but I decided to go with NextJS. I really liked its flexibility to handle both static site generation as well as server-side rendering if necessary. [Vercel](https://vercel.com/home) is the company behind NextJS and they also make the deployment and hosting seamless not to mention serverless function offerings. I know Gatsby is great, but NextJS seemed like the best fit for my current needs and future goals.

The next decision was the headless CMS, Content Management System, that is used to create and store the content for the blog. There are so many options available, but I was looking for something flexible and that would integrate well with my development workflow. As I was looking through options I came across [Ghost](https://ghostcms.net/welcome/), [Contentful](https://www.contentful.com/), [NetlifyCMS](https://www.netlifycms.org/), and many others, but I decided to go with [Strapi](https://strapi.io/).

I chose Strapi for a few reasons:
1. Free tier offering
2. Ability to run CMS locally with Docker
3. Several configurable database providers
4. Great documentation for development and deployment

In its documentation, Strapi had guides to deploy to several different hosting providers like Digital Ocean, Heroku, AWS, Azure, and more. The database is pretty well abstracted through the interface, but I chose Postgres since I've worked with it before. For hosting the CMS and database I chose Heroku for reasons that I'll get into in the final section.

### Use Free Software (At Least for Now)
The final goal I had when creating this blog was to do it as cheaply as I could. I don't have any intentions to ever make any money from this blog. It is more of a way for me to put my thoughts into words and hopefully help out anyone who stumbles across my posts. With that in mind, I wanted to do my best to find services that offered at least an initial free tier with the ability to scale up and pay more if I need to. So let's take a look back at the decisions I made thus far and how they fit into this goal.
1. NextJS - Using NextJS, the framework, costs nothing.
2. Vercel - The no-brainer choice for deploying a NextJS app. They offer a free tier that you can sign up for with no credit card required.
3. Strapi - Free tier for individuals.
4. Heroku - Free tier for both hosting the CMS application and Postgres database. The free database tier is a little limited in terms of storage capacity, but even if I have to bump it to $10/month that's not the end of the world.

That's pretty much my entire stack, which as you can see, didn't cost me a penny. I was honestly amazed at how easy it was to go from zero to what you're looking at now in the matter of a few weeks. I'm grateful for all the work that has gone into these technologies that I used and couldn't recommend them enough (even the alternatives that I didn't end up going with because I'm sure they're great too).

I think that just about wraps up this post. If you're thinking about creating a site or blog, I hope this gives you some direction or clarity. There are so many options out there it can be difficult to make a decision. If you have any questions, definitely reach out!
