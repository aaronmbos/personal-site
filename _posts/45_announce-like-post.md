---
id: 45
slug: announce-like-post
title: "Announcing the Ability to Like Posts"
description: Up to this point, there has been no way to interact with the posts that I publish on this blog. The most recent release changes that. Readers can now like posts after reading them. In this post, we'll be discussing the feature, the high-level implementation, and how it could evolve in the future. Let's dive in!
publishedAt: 2022-08-01T02:35:07.765Z
updatedAt: 2022-08-01T02:35:07.789Z
metadata: introduction,dev,learning
---
## How it Works

The ability to react to a post has been on my mind since starting this blog and I finally took the time to implement it. When thinking about how I wanted this feature to work, I first tried to think of applications that do reactions well. The first app that came to mind was Slack. Obviously Slack does reactions in a much more robust fashion, but in terms of UX Slack was a great point of reference for me.

![slack-ui.jpg](https://res.cloudinary.com/aaron-bos/image/upload/v1659320701/slack_ui_ce0827754b.jpg)

The key constraint for me and this feature was the fact that there is no concept of an authenticated user on my blog. This brought the challenge of not allowing a single user to like a post more than once. Ultimately the way I decided to solve this problem was by using the client's IP address as a "pseudo unique identifier". The next time the user visits the blog from that same IP address, the post will already be reacted to and the UI will indicate that. At this point, the user has the ability to remove their reaction. I understand that this is not perfect or without flaws, but it was a solution that I felt would be "good enough" for what I was looking to do.

![like-post.gif](https://res.cloudinary.com/aaron-bos/image/upload/v1659320701/like_post_a3baaac0b6.gif)

## Implementation Details

I'll break the implementation details up into three separate sections **client, API, and database**. Each section will go into a bit of detail about that particular piece of the feature.

### Client

The notable change from the client perspective is the introduction of a new row of buttons to like, share or subscribe. The share and subscribe we're previously anchor tags in the footer paragraph. Moving them to buttons provides a better experience.

![new-buttons.png](https://res.cloudinary.com/aaron-bos/image/upload/v1659320701/new_buttons_1c50bb09e0.png)

The request functionality is managed with the [SWR](https://swr.vercel.app/) library, which handles much of the complexity with data fetching and mutating.

### API

Since this is a NextJS app hosted on Vercel, it seemed logical to use the built-in API functionality of [NextJS](https://nextjs.org/docs/api-routes/introduction). This involved creating a new file to handle API requests for reacting to posts. I left the implementation relatively open to adding more reaction types in the future.

The API required three possible methods `GET`, `POST`, and `DELETE` which are used to manage all of the functionality for showing reaction count, determining if the "user" has liked the post already, and reacting/removing reactions.

### Database

Choosing a database and managed database provider was the most difficult part of this feature. My goal was to make this happen in the most cost-effective manner possible. After doing a bit of research, I decided to go with [CockroachDB](https://www.cockroachlabs.com/product/). There were a few main factors that played into this decision.

- Serverless option with **generous** free tier
- Postgres compatible (I can use existing local Postgres database for local dev)
- Great documentation
- Option to scale up if needed (I don't expect to early on)

The database requirements were pretty light for this feature. I needed a single table to store the post slug, reaction type, client IP address, and timestamp. With this information, I can determine if the requesting IP address has liked a post before along with like counts for a particular post. The primary key is a composite key of all three columns.

## Potential Evolution

Now that you know some more detail about the feature itself and how it was implemented I'll briefly touch on how I see this feature evolving in the future. The first potential for change is the addition of reaction types. For this first release the only option is a 👍 to like the post, but I could also see a potential for ❤️, 🚀, 🙂, or any other emojis that invoke a positive meaning (sorry no 💩 emoji here).

The elephant in the room at this point might be whether or not I'll ever introduce authentication to verify identity prior to reacting (or maybe even commenting). The use of client IP addresses is a little clumsy and not perfect, but I really don't see a need for any authenticated experience on my blog currently. For now, we'll keep this idea on the shelf.

Ultimately this feature provided me the opportunity to play with some new tech and also provide some value to my readers. I hope this goes without saying, but please give this post a "like" and subscribe via RSS if you'd like to keep up to date.
