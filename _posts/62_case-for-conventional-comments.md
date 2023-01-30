---
id: 62
slug: case-for-conventional-comments
title: "My Case for Conventional Comments"
description: "In this post, I'll be presenting my case for the use of conventional comments in code review. I've been an advocate for conventional comments for about a year and my hope is to share the benefits so that others can adopt their own standards for code review. Let's dive in!"
publishedAt: 2023-01-DDTHH:MM:SS.000Z
updatedAt: 2023-01-DDTHH:MM:SS.000Z
metadata: dev,practices,musings
---

## What are conventional comments?

Code review is an integral part of working on software collaboratively. The collaboration may be at work with team members, on an open source project with other contributors, or on a school project with classmates. Regardless of the situation, code review is almost guaranteed to be required before merging changes.

Code review is also time consuming. The back and forth communication on initial and follow-up changes can go on for hours, days, and even weeks before the final approval is given for a set of changes. With that being said, wouldn't it make sense to look for ways to make code reviews as simple as possible? I think so.

This is where conventional comments come in. At their core, **conventional comments** (not to be confused with [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)) are code review comments that follow a predefined set of standards. We'll go into some examples of standards later in this post, but ultimately the standards can be as rigid or flexible as needed to fit the needs of the team.

## Structure of conventional comments

As I mentioned previously, there isn't a globally defined standard for structuring conventional comments, but I think this [site](https://conventionalcomments.org/) provides a great starting point. In my experience, I haven't needed to deviate too much from the comment structure defined on the referenced site.

```
<label> [decorations]: <subject>
[discussion]
```

The `label` and `subject` are required fields (surrounded by `<>`), whereas the `decorations` and `discussion` fields are optional (surrounded by `[]`). Following this comment format provides a platform for **description, but not distracting** context for each comment. The conventional comment site provides a lot of great examples as well as a list of great labels and decorations to get started. In my day to day I've used the following labels most commonly.

- suggestion: propose an improvement or change (could be blocking or non-blocking)
- nitpick: trivial request based on preference
- question: ask submitter for clarification or relevance
- thought: useful for providing helpful context and sparking discussion

While this list it thorough, it is not exhaustive. The great thing about this format is that it can be adapted to fit the requirements of any team that applies it.

## Why are conventional comments helpful?

If you've never experience bad code reviews or never considered ways to improve the code review process, you may be wondering why conventional comments are beneficial? In my opinion conventional comments benefit both the submitter of the code review and also the individual reviewing the code.

From the **reviewer** side of the coin conventional comments allow for clear expression of intention and tone in each comment. This reduces any possible friction or confusion that could result from an unclear or ill-thought-out comment. In this same vein I think conventional comments force commenters to put a litte extra thought and care into the comments that are left, which leads to higher quality reviews.

Since conventional comments reduce confusion and friction, this results in a quicker code review process with potentially less back and forth. The submitter should understand the action that needs to happen when responding to a conventional comment. For example, the change requested in this comment needs to be addressed before approval.

> suggestion (blocking): Let's move this guard clause earlier to exit sooner in the case of failure.

From the perspective of the code review **submitter**, the fact that the the "gray area" is removed with the use of conventional comments is key. There shouldn't be any ambiguity as to what should happen as the result of a comment.

The final benefit of using a conventional comment format is parasability. We can easily request and parse PR comments to understand what kind of review is taking place. Are we most leaving "nitpick" comments? Maybe we need to tweak the linter or format tool during development time. Are there a lot of "issue" comments? Maybe engineers need to be more better about understanding requirements before and throughout development.

These are all reasons why conventional comments can benefit code reviews for any team, even if the team doesn't think code review is an immediate concern.

Analyzing PR comments with GitHub API

- Demonstrate how the comments can be requested and parsed
