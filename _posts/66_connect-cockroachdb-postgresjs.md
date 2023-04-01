---
id: 66
slug: "connect-cockroachdb-postgresjs"
title: "Connecting to CockroachDB with Postgres.js"
description: "I've been using CockroachDB on this blog for some time and I've recently transitioned to using the Postgres.js library for interacting with the database. In this post, I'm going to share how to connect to CockroachDB from a Node app using Postgres.js."
publishedAt: YYYY-MM-DDTHH:MM:SS.000Z
updatedAt: YYYY-MM-DDTHH:MM:SS.000Z
metadata: cockroachdb,postgres,node
---

I began using CockroachDB several months ago for the blog post reaction implementation (don't forget to like this post 😏). During the initial implementation, I was hoping to use [Postgres.js](https://github.com/porsager/postgres) to connect to my CockroachDB serverless cluster. I, unfortunately, ran into a couple of stumbling blocks and opted to use the [node-postgres](https://github.com/brianc/node-postgres) npm package, which is actually recommended in the CockroachDB documentation.

Using node-postgres was fine, but I was still interested in Postgres.js for the following reasons.

- Easy-to-use API that allows for flexible and safe SQL query/command definitions
- Supports TypeScript out of the box
- ESM support (pg only supports CommonJS)
- Postgres.js markets itself as the fastest Postgres library for Node

I'll start off by saying that Postgres.js has great documentation and I think I could have gotten beyond my initial hurdles had I persisted, but I decided to take a path of "least resistance" and use node-postgres instead. I was recently wishing for ESM and TypeScript support from my database methods, which prompted me to revisit Postgres.js. To get started we'll be working in a file called `db.js` that imports the `postgres` module.

```js
// db.js

import postgres from "postgres";

// connection details to come
```

At the heart of the database connection is the `postgres([url], [options])` method, which provides parameters to define the information required to connect to a database. In my case, I'll be using a connection string URL, but the option is available to provide individual connection values as part of the object passed to the `postgres` method. The options provided will override any values that are in the connection string URL.

```js
// db.js

import postgres from "postgres";

// Always get sensitive information from the environment variables or secrets
const connectionString =
  "postgresql://user:password@db_server_url?sslmode=verify-full";

const sql = postgres(connectionString);

export default sql;
```

So far this is standard code for connecting to databases, the aspect that I stumbled on initially was the `sslmode=verify-full` option that requires a Certificate Authority signed SSL certificate to connect. This SSL mode isn't "required", but it is [strongly recommended](https://www.cockroachlabs.com/docs/v22.2/connection-parameters#secure-connections-with-urls) for production clusters. I needed a way to provide the certificate to CockroachDB through the driver provided by Postgres.js, but wasn't sure how.

I initially was expecting there to be some extra work to pass the certificate to the database driver, but recently found out that the Postgres.js driver will automatically use the certificate that exists on the server. This means that in order to use the `sslmode=verify-full` option for local development, I need to have the certificate installed on my development machine. Luckily CockroachDB provides a simple way to request, download, and save the certificate in the correct location.

### Login to your cluster and select the database you want to connect to.

![cockroachdb-databases](https://res.cloudinary.com/aaron-bos/image/upload/v1680309310/cockroachdb-databases_bqy7jf.png)

### Click on the connect button

![cockroachdb-connect-button](https://res.cloudinary.com/aaron-bos/image/upload/v1680309310/cockroachdb-connect-button_jqgbhk.png)

### Copy, paste, and run the command provided in the modal

![cockroachdb-cert-download](https://res.cloudinary.com/aaron-bos/image/upload/v1680309310/cockroachdb-cert-download_igzmhf.png)

I think one point that is worth calling out before wrapping up is that `sslmode=verify-full` isn't the only option for connecting to CockroachDB, but it is the only recommended secure option. The documentation does indicate that `sslmode=disabled` can be used for development purposes. The reason SSL is so important for database connections is that without it, connections are vulnerable to "Man in the middle" (MITM) attacks.

Overall I'm really happy that I transitioned to using Postgres.js for the reasons I listed earlier in the post. Ultimately the transition from pg to Postgres.js was painless and I'm a little bummed that I didn't persevere through the hurdles that I encountered months ago. I did learn a bit about SSL along the way so it's been a worthwhile endeavor.
