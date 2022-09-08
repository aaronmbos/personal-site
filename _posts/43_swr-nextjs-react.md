---
id: 43
slug: swr-nextjs-react
title: "Effective Data Fetching with React and SWR"
description: Retrieving data is typically a straightforward task. Retrieving data in the most efficient manner can be more complex. This post will dive into how SWR can simplify the process of fetching data while also solving potentially complex problems like performance, caching, data store mutation, and more. Let's dive in!

publishedAt: 2022-07-12T03:48:13.461Z
updatedAt: 2022-07-12T03:55:46.330Z
metadata: web,dev,react
---
## What is SWR?

Before we get into the weeds on how SWR impacts our application development, I think it's useful to explain what it is and its purpose. The acronym `SWR` originates from a well-known cache invalidation strategy known as _stale while revalidate_. The premise behind this strategy is as follows.

- A cached response is returned to the client for a specified amount of time (in seconds)
- The cache should attempt to revalidate (i.e. request fresh data) asynchronously while still serving the stale data
- When the amount of specified time passes, the response is deemed to be officially stale
- In the case of officially stale data, fresh data will be served on the next request

In fact, this cache invalidation is built into the HTTP specification. If you'd like to learn more about the HTTP specifics check out the RFC [here](https://datatracker.ietf.org/doc/html/rfc5861#section-3).

In the context of this post, SWR is referring to a library developed by the wonderful people at Vercel. In its simplest form, SWR can be explained as "React Hooks for Data Fetching", which is exactly what we'll be exploring in this post. In the words of the creators.

> With SWR, components will get a stream of data updates constantly and automatically. And the UI will be always fast and reactive.

I don't know about you but that sounds almost too good to be true. Typically fetching data will involve the `useEffect` hook and that works great for the initial retrieval of data, but the story gets more complicated when more complex scenarios like caching and data store mutation come into play. This is where SWR interjects. The `useSWR` hook provides an extensible interface to retrieve data in the most effective manner possible.

## Using SWR

For the purpose of this post, we will be focused on using SWR in the context of a Next.js application. With that being said SWR is not specific to Next.js. It can be used in any React-based application or framework.

At its core, SWR provides robust functionality for efficiently fetching data. It does so by providing the hook `useSWR` which can be called from a component that is dependent on fetching data. The primary usage of `useSWR` involves providing a "key" and a "fetcher" method. The fetcher method is an async method that accepts the "key" as an argument and uses it to fetch data (i.e. make an API request to retrieve data). There are many options to configure SWR to your needs which range from retry functionality, callbacks, refreshing data, etc., but in this post we'll be focusing on three main features of SWR.

1. Data Fetching
1. Auto Revalidation
1. Mutation

If you'd like to take a complete look at all of the options available with SWR, check out the documentation [here](https://swr.vercel.app/docs/options).

### Data Fetching

SWR makes the task of fetching data relatively simple when compared to other methods like relying on `useEffect`. The great thing about SWR is that it takes care of so much typical boilerplate code that is normally required for fetching data. It really boils down to providing a unique key for fetching and caching the data along with a method that informs SWR on how to get the data. In the following examples, we'll be looking at using SWR to request blog post reactions from a component.

I think the first aspect to consider when using SWR is structuring the key. The key needs to be unique to the app so that caching and mutation can work as expected. In my case, I'll be using the API route including the unique slug for the requested post. The key does not need to be a string, but using the unique post slug seemed a good fit for my use case.

```typescript
`/api/post/reaction?slug=${postSlug}`;
```

The fetcher that I am using is simply wrapping the fetch method accepting the key (URL) and returning the JSON.

```typescript
const fetcher = (url: string) => fetch(url).then((r) => r.json());
```

With the return values of the `useSWR` hook, we are able to provide experiences for success, loading and error states out of the box. The current example is a rudimentary implementation of state handling, but it can be as robust as needed for the given use case.

```typescript
const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function ReactionRow({ postSlug }: Props) {
  const { data, error } = useSWR(
    `/api/post/reaction?slug=${postSlug}`,
    fetcher
  );

  if (error) {
    // Can do something more with the error
    return <div>Error</div>;
  }
  if (!data) {
    // Default to this while the request is being made
    return <div>Loading</div>;
  }

  return <div>{data}</div>;
}
```

Before moving on to the next section one really interesting feature of data fetching with SWR is the ability for it to recognize duplicate requests and only make a single request to hydrate the data. To demonstrate this let's say we have a component (or multiple) that uses the `ReactionRow` component which uses `useSWR` twice (invoked with the same key). Instead of making two API requests to the server, only one request will be made but both component instances with have the necessary data.

![component-screenshot.png](https://res.cloudinary.com/aaron-bos/image/upload/v1657596975/component_screenshot_595dd31393.png)

When the page is loaded, we see the slug displayed twice but only a single API request in the Network tab.

![browser-screenshot.png](https://res.cloudinary.com/aaron-bos/image/upload/v1657596976/browser_screenshot_f370bd225b.png)

### Auto Revalidation

Now that we have a solid understanding of the out-of-the-box functionality of SWR we can jump into a couple of features that I found interesting while using it. First up is "auto revalidation". Auto revalidation is an option that can be specified on a request-to-request basis or globally. Its purpose is to allow the user to configure the frequency at which SWR attempts to revalidate data via the provided fetcher method. By default, SWR does not automatically revalidate data. Let's take a look at a quick example of how we can configure SWR to revalidate our data every second.

We'll be using the same example code as last time except we'll make a quick update to make the returned data a little more obvious that it has been revalidated. As you can see from the GIF below the fetcher is used to make an API request (which now returns a timestamp in the request) and the components are updated based on the fresh data.

![auto-revalidate-swr.gif](https://res.cloudinary.com/aaron-bos/image/upload/v1657596976/auto_revalidate_swr_78e5e81ef5.gif)

There are many other revalidation strategies available in SWR and I definitely recommend heading over to the docs to see if any fit your particular use cases!

### Mutation

To this point, we've spent most of the time looking at fetching data. In most applications where fetching data is required, there is also the possibility of that data changing. As we've just seen we can use auto revalidation to refresh data on certain events or intervals, but what if we wanted to update data right when it changes? That is where "mutations" come into the picture.

SWR provides a few options for mutation revalidation and the one we'll be looking at simply mutates the data and immediately updates the cache and prompts any `useSWR` hooks with the mutated key to update. There are also options to update optimistically before the fetcher function returns, which can be useful if you have a mutation that takes a bit of time but don't want the user to wait for the UI to respond.

Let's look at an example in which we've added a button to the previous code along with importing the global `mutate` function from `useSWRConfig`. The `mutate` method is provided the key to mutate in the `onClick` property of the button. As you can see from the GIF the UI is updated based on the response of the API request each time the button is clicked.

```typescript
import useSWR, { useSWRConfig } from "swr";

interface Props {
  postSlug: string;
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function ReactionRow({ postSlug }: Props) {
  const { mutate } = useSWRConfig();

  const { data, error } = useSWR(
    `/api/post/reaction?slug=${postSlug}`,
    fetcher
  );

  if (error) {
    // Can do something more with the error
    return <div>Error</div>;
  }
  if (!data) {
    // Default to this while the request is being made
    return <div>Loading</div>;
  }

  return (
    <>
      <div>{data}</div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded"
        onClick={() => mutate(`/api/post/reaction?slug=${postSlug}`)}
      >
        Mutate
      </button>
    </>
  );
}
```

![mutation-swr.gif](https://res.cloudinary.com/aaron-bos/image/upload/v1657596975/mutation_swr_38ce0de06a.gif)

## Wrapping Up

In this post, we went over a lot of cool functionality that SWR provides. If anything here has sparked your interest, I would highly recommend checking it out and giving it a ⭐ on [GitHub](https://github.com/vercel/swr). I'm currently in the process of learning and using it to add post reactions to my blog posts!
