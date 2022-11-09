---
id: 53
slug: github-revoke-token-on-push
title: "GitHub Has Our Back With Token Security"
description: I recently stumbled across some behavior by GitHub that was surprising at first, then reassuring once I understood the root cause. In this post, we are going to discuss a particular aspect of GitHub's security around keeping GitHub API tokens out of public repositories. Let's dive in!
publishedAt: 2022-10-21T01:10:00.000Z
updatedAt: 2022-10-21T01:10:00.000Z
metadata: learning,security,github
---

## How GitHub keeps tokens safe

There are several measures that GitHub takes to keep tokens safe in repositories. This blog post is going to be focused mainly on GitHub API access tokens and storing them in our source code. If you'd like to take a look at the full documentation on GitHub API token security, you can check it out [here](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/token-expiration-and-revocation). I'd like to start by saying that it is almost always best to err on the side of caution when dealing with any sort of tokens or secrets in code. This means keeping the tokens out of code that gets committed to source control and instead using environment variables and/or key vaults.

With that being said this post is going to be focused on the scenario of committing a GitHub API token to a public repository and pushing the commit up to GitHub. I was recently playing around with GitHub's GraphQL API, which requires a token for access. For my purposes, I was only concerned with **reading public data** via queries provided by the GitHub GraphQL API. Based on the documentation **at the time**, it was my understanding that an access token that is granted no scopes could be freely committed and pushed to a public repository because it only provided read access to public data.

As I began testing and using the GraphQL API in a test app, I noticed that every time I pushed code to the remote on GitHub that the GraphQL requests would begin to fail. After each push, I didn't receive any sort of notification or email about a token being revoked, but I did notice the token was being deleted from my account. After doing some research, I finally found the token security article I linked to before, which laid out the behavior that I was expecting. Public access tokens with no granted scopes should not be automatically revoked.

> OAuth tokens and personal access tokens pushed to public repositories and public gists will only be revoked if the token has scopes.

I was able to confirm the deletion of the API tokens by GitHub via the Security Log page, which is kind of hidden away unless you know where to find it. If you are logged into GitHub, you should be able to access it via [https://github.com/settings/security-log](https://github.com/settings/security-log). If the GitHub system revoked a token due to it being pushed to a public repo, you would see a log by "GitHub System" of the type `oauth_authorization.destroy`. This is the only indication of a token being removed by the system.

![security-log](https://res.cloudinary.com/aaron-bos/image/upload/v1666313877/Screen_Shot_2022-10-20_at_7.40.08_PM_lkbatc.png)

At the time this behavior was inconsistent with the documentation provided by GitHub, so I reached out via their support channel which led to them updating the documentation to its current state indicating that ALL GitHub access tokens, regardless of granted scopes, will be deleted when pushed to public repositories. The reason for this **updated** behavior is that classic Personal Access Tokens can be updated with scopes after they have been created. This is not the case with current access tokens. If scope changes are needed, a new token needs to be created.

So with all this being said, I was surprised initially by GitHub's behavior and its contradiction of the documentation, but after reaching out to support and the documentation being updated I completely understand the reasoning for this security. More than anything this was probably just another reminder to avoid taking shortcuts, even in little test apps because a simple mistake can lead to private tokens being leaked and used for unintended purposes.
