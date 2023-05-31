import RSS from "rss";
import fs from "fs/promises";
import sql from "../database/db.mjs";

async function generateRssFeed() {
  const feed = new RSS({
    title: "Aaron Bos",
    site_url: `${process.env.NEXT_PUBLIC_ORIGIN_RSS}`,
    feed_url: `${process.env.NEXT_PUBLIC_ORIGIN_RSS}/feed.xml`,
    image_url: `${process.env.NEXT_PUBLIC_ORIGIN_RSS}/static/card-logo.png`,
  });

  const posts =
    await sql`select id, title, content, slug, description, tags, (published_at at time zone 'utc') as published_at from post.post where published_at is not null order by published_at desc`;

  posts.map((post) => {
    feed.item({
      title: post.title,
      url: `${process.env.NEXT_PUBLIC_ORIGIN_RSS}/posts/${post.slug}`,
      date: post.published_at,
      description: post.description,
      categories: post.tags,
      author: "Aaron Bos",
    });
  });

  await fs.writeFile("./public/feed.xml", feed.xml({ indent: true }));
}

generateRssFeed().then(() => process.exit());
