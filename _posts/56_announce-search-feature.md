---
id: 56
slug: announce-search-feature
title: "Introducing Search to my Blog"
description: "My blog's two year anniversary is coming up in January 2023 and in that time I've written 56 posts on a variety of topics. In order to provide some more visibility into posts without having to scroll through them all I've added the ability to search posts. In this post, we're going to talk a bit about the feature, its implementation, and how it might evolve in the future. Let's dive in!"
publishedAt: YYYY-MM-DDTHH:MM:SS.000Z
updatedAt: YYYY-MM-DDTHH:MM:SS.000Z
metadata: announcement,blog,feature
---

When I started this blog almost two years ago I wasn't sure if blogging would be "my thing". At this point, two years in, I still don't know if blogging is my thing. I can say that I look forward to sharing the things that I learned and build to anyone who might be interested. One big part of being able to share what I'm learning is the ability to discover similar posts to the post that brought someone to my blog in the first place. Let's say someone landed on my [post](https://aaronbos.dev/posts/merge-objects-typescript-javascript) about merging objects in TypeScript and wanted to see what other posts I may have on TypeScript in general. Without an effective search feature the visitor would be forced to sift through all 56 posts on the [posts](https://aaronbos.dev/posts) page.

This rudimentary method of searching may be effective for some topics, but not for all. For that reason it felt like the right time to add some more robust search functionality to this site. I think having the ability to search posts easily from any page will definitely help visitors discover other posts they might be interested in. Let's take a look at the requirements I laid out for myself as I began to implement the new search feature.

## Search Requirements

When I set out to build search into my blog I put a decent amount of thought into what the feature needed to do for my users, but also for myself as the maintainer of the blog. Here is a list of minimum requirements that I laid out for myself before beginning the work.

- Free, if possible (To this point I haven't paid a penny for this blog and I'd like to keep it that way for as long as I can)
- Search based on post title, description, content, and tags
- Flexible API to search and manage content
- Analytics to monitor search usage **anonymously** (I don't want your data)

### Cost of Search

The requirement of cost all came down to the search service that I selected. I knew from the beginning that I did not want to build the search from scratch as there are plenty of managed services out there that can do it much better than me. I considered a few different options for search, most notably [Pagefind](https://pagefind.app/) and [Algolia](https://www.algolia.com/). While both options met my needs for search and cost, they're drastically different in underlying implementation and functionality. Pagefind is said to provide static, low-bandwidth search at scale, which does not require any additional infrastructure. Pagefind does this by indexing all of the content after any build steps take place and then outputs a bundle that is referenced by the application to perform searches on the index. Pagefind seems very promising, but the technology relies on WASM in the output bundles which isn't completely supported in all browsers.

The option that I ultimately decided to go with was Algolia, which is at the opposite end of the spectrum from Pagefind in terms of site search solutions. Algolia is a completely managed "search as a service" platform that provides search for companies like Slack, Stripe, and Staples. Algolia is not **100%** free, but they offere a generous free tier of 10,000 requests per month. The free tier should more than cover my needs for search at this point in time. Algolia has rich documentation and SDK support for several languages. They even offer UI components that can be dropped into popular frameworks like React and Vue. I opted not to use the pre-built UI components for reasons that we'll get to later. Algolia also includes a dashboard that will track searches on my blog's index. The dashboard provides quite a bit of information like total searches by day, top queries, top results, and more. After testing a bit with both Pagefind and Algolia, the latter was the obvious winner for me.

### Searchable Content

In terms of the content from my blog that is searchable I wanted to find a solution that would index multiple components from each post. For example, if a visitor were to search for "C#" I want search results for any title, description, post, or tag that contains the queried value. Algolia provided this functionality in its search index by supporting objects to be indexed. The ability to index an object allowed for me to upload all of the components of each blog post to make search effective. Below is an example of the object that I send to Algolia when adding to or updating the search index.

```
{
  objectID
  title
  content
  slug
  description
  metadata
  date
}
```

### Developer-friendly API

With my blog I've always approached features as an opportunity to learn something versus grabbing an off-the-shelf solution. I think that Algolia provides a nice in-between where the nitty-gritty search details are encapsulated by a well-documented and easy to use API. Algolia has SDKs for several languages, most importantly for me TypeScript, which makes it a great solution for any project or team. From everything that I've seen so far Algolia's API is fully-featured allowing users to do just about anything. From searching to managing indeces Algolia has developers covered with their API.

### Analytics

## Future Considerations
