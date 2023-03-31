---
id: 66
slug: "connect-cockroachdb-postgresjs"
title: "Connecting to CockroachDB with Postgres.js"
description: "I've been using CockroachDB on this blog for sometime and I've recently transitioned to using the Postgres.js library for interacting with the database. In this post, I'm going to share how to connect to CockroachDB from a Node app using Postgres.js."
publishedAt: YYYY-MM-DDTHH:MM:SS.000Z
updatedAt: YYYY-MM-DDTHH:MM:SS.000Z
metadata: cockroachdb,postgres,node
---

I began using CockroachDB several months ago for the post reaction implementation (don't forget to like this post 😏). During the initial implementation I was hoping to use Postgres.js to connect to my CockroachDB serverless cluster. I unfortunately ran into a couple of stumbling blocks and opted to use the pg npm package, which is actually recommended in the CockroachDB documentation.

Using pg was fine, but I was still interested in Postgres.js for the following reasons.

- Easy to use API that allows for flexible and safe SQL query/command definitions
- Supports TypeScript out of the box
- ESM support (pg only supports CommonJS)
- Postgres.js markets itself as the fastest Postgres library for Node

I'll start off by saying that Postgres.js has great documentation and I think I could have got past my initial hurdles had I persisted, but I decided to take a path of "least resistance" and use pg instead. I was recently wishing for ESM and TypeScript support from my database methods, which prompted me to revisit Postgres.js. To get started we'll be working in a file called `db.js` that imports the `postgres` module.

```js
// db.js

import postgres from "postgres";

// connection details to come
```

At the heart of the database connection is the `postgres([url], [options])` method, which provides parameters to define the information required to connect to a database. In my case I'll be using a connection string URL, but the option is available to provide individual connection values as part of the object passed to the `postgres` method. The options provided will override any values that are in the connection string URL.

```js
// db.js

import postgres from "postgres";

// Always get sensitive information from the environment variables or secrets
const connectionString =
  "postgresql://user:password@db_server_url?sslmode=verify-full";

const sql = postgres(connectionString);

export default sql;
```

So far this is standard code for connecting to databases, the aspect that I stumbled on initially was the `sslmode=verify-full` option that requires a signed SSL certificate to connect. This SSL mode isn't "required", but it is strongly recommended for production clusters. I needed a way to provide the certificate to CockroachDB through this `postgres` method, but wasn't sure how.
