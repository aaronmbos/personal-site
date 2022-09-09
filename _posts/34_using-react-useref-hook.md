---
id: 34
slug: using-react-useref-hook
title: "When to Use React.useRef"
description: The introduction of hooks a couple of years ago (version 16.8) introduced a massive paradigm shift in the world of React. Hooks allow developers to "hook" into state and component lifecycles without the use of classes! In this post, we're going to look at the useRef hook, how it works, and why we should use it.
publishedAt: 2022-04-11T00:33:55.060Z
updatedAt: 2022-04-11T00:33:55.088Z
metadata: web,dev,javascript,typescript,react
---
## What is `useRef`?

`useRef` is one of the many built-in hooks provided by React. It is useful for persisting mutable data between component renders. There are a couple of specific uses cases for `useRef` and refs that I'd like to call out.

1. Modifying a child DOM node outside of the typical React data flow.
2. Treating the mutable object returned by `useRef` similar to an instance property

One way that the React documentation explains the reference returned from `useRef` is to think of the reference as a box or container. We are able to provide an initial value for the container via the `initialValue` param of `useRef`. Once a value is provided we can access the same object via the `.current` property. Let's take a closer look at the specific use cases for `useRef` and dive into some examples.

## Accessing the DOM via `useRef`

In React when a parent component needs to interact with a child the interaction normally takes place via `props` passed down to the child component. There are times when this sort of behavior isn't possible, for example when interacting with a DOM element. This is where refs come into play. I will note that the React documentation recommends using refs only when necessary and to try to implement component state effectively to avoid the need for refs.

We are also going to be talking about refs in the context of functional components. Refs can be used with class components, but the way they are used with class components is slightly different. If you'd like to see how to use refs in class components check out the docs [here](https://reactjs.org/docs/refs-and-the-dom.html#adding-a-ref-to-a-class-component).

Refs can be used inside functional components as long as they are passed to a DOM element or a class component. The reason that refs cannot be passed to a functional component is that the result of a functional component is purely what the function returns and not the actual instance of the component.

Instead of including some code samples here, I am going to link out to the React [docs](https://reactjs.org/docs/refs-and-the-dom.html#refs-and-function-components) because I think they provide everything needed to understand how refs and `useRef` can be used with DOM elements in React. Next, we're going to look at how refs can be used inside of functional components and be thought of as instance properties on a class.

## Treating Refs like "Boxes" for Components

In the last section, we focused mainly on how refs are passed to DOM elements or class components, which provides an imperative way to interact with those child elements. In this portion of the post, we're going to focus more on the `useRef` hook itself, how it works, and how it can be used effectively in React applications.

The first thing to note is that when we call `useRef` and provide an initial value the function will return a **mutable** object that contains a `.current` property. The value of the `.current` property will be the current value of the reference. So immediately after creation `const theRef = useRef<number>(100);` if we then checked the value of `theRef.current` it would be `100`. The documentation states that refs should not be set during rendering unless using lazy initialization. Without going too deep on lazy initialization in this post (maybe the topic for a future post 😉) we want to avoid doing this.

```typescript
function testComponent(props: Props) {
    // This is done on every render
    const ref = useRef<ExpensiveObject>(new ExpensiveObject());
    // ... rest of component
}
```

In the example above the ref will be set on every render of that component. It's best to set the ref in an effect if possible or lazily initialize the object.

```typescript
function testComponent(props: Props) {
  // This is done on every render
  const ref = useRef<ExpensiveObject>(null);

  function getExpensiveObject(): ExpensiveObject {
    if (ref.current === null) {
      ref.current = new ExpensiveObject()
    }
    return ref.current;
  }

  // use getExpensiveObject to access
}
```

The object that is returned by `useRef` is persisted between component renders and it does not cause a re-render when the `.current` value changes. When I say that the ref object is "persisted between renders", I mean that it is the same object reference that is returned when calling `.current`. As I mentioned before effects are a great place to set ref objects. I'm going to share an example from a small [app](https://github.com/aaronmbos/timeya) that I created that allows the user to create timers (counting up or down). Since the timers use intervals, it was a perfect opportunity to implement `useRef` inside of a `useEffect`. If you'd like to see the full component, check it out on [GitHub](https://github.com/aaronmbos/timeya/blob/main/src/components/TimerCard.tsx).

```typescript
const interval = useRef<number>();

useEffect(() => {
  if (timerState.isStarted) {
    if (props.type === TimerType.Countdown) {
      // ... unimportant code omitted
      interval.current = window.setInterval(() => countdownTick(), 1000);
    } else {
      interval.current = window.setInterval(() => tick(), 1000);
    }
  }

  return () => {
    clearInterval(interval.current);
  };
});
```

As you can see in this example the `.current` property is set when `useEffect` runs and we utilize the return callback to clear the interval when the component is "unmounted".

This has been a quick rundown of the `useRef` hook and how it can be used effectively in React. While refs may not be used in every component, I think they are very useful when the situation calls for what they provide.