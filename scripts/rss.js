const { promises: fs } = require("fs");
const fetch = require("node-fetch");
const RSS = require("rss");
const dotenv = require("dotenv");

dotenv.config();
const postsUri = `${process.env.STRAPI_BASE_URI_RSS}/posts`;

async function generateRssFeed() {
  const feed = new RSS({
    title: "Aaron Bos",
    site_url: `${process.env.NEXT_PUBLIC_ORIGIN_RSS}`,
    feed_url: `${process.env.NEXT_PUBLIC_ORIGIN_RSS}/feed.xml`,
    image_url: `${process.env.NEXT_PUBLIC_ORIGIN_RSS}/static/card-logo.png`,
  });

  const res = await fetch(`${postsUri}?_limit=-1&_sort=published_at:desc`);
  const rawPosts = await res.json();

  rawPosts.map((post) => {
    feed.item({
      title: post.title,
      url: `${process.env.NEXT_PUBLIC_ORIGIN_RSS}/posts/${post.slug}`,
      date: post.published_at,
      description: post.description,
      categories: post.metadata.map((tag) => tag.tag),
      author: "Aaron Bos",
    });
  });

  await fs.writeFile("./public/feed.xml", feed.xml({ indent: true }));
}

generateRssFeed();
