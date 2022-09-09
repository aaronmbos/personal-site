const RSS = require("rss");
const dotenv = require("dotenv");
const matter = require("gray-matter");
const path = require("path");
const fs = require("fs/promises");

dotenv.config();

async function generateRssFeed() {
  const feed = new RSS({
    title: "Aaron Bos",
    site_url: `${process.env.NEXT_PUBLIC_ORIGIN_RSS}`,
    feed_url: `${process.env.NEXT_PUBLIC_ORIGIN_RSS}/feed.xml`,
    image_url: `${process.env.NEXT_PUBLIC_ORIGIN_RSS}/static/card-logo.png`,
  });

  const postsDir = path.join(process.cwd(), "_posts");
  const posts = await fs.readdir(postsDir);

  const rawPosts = posts
    .map((post) => {
      const matterPost = matter.read(`${postsDir}/${post}`);
      return {
        id: matterPost.data.id,
        title: matterPost.data.title,
        content: matterPost.content,
        slug: matterPost.data.slug,
        description: matterPost.data.description,
        metadata: matterPost.data.metadata.split(","),
        date: matterPost.data.publishedAt,
      };
    })
    .sort((post1, post2) =>
      new Date(post1.date) > new Date(post2.date) ? -1 : 1
    );

  rawPosts.map((post) => {
    feed.item({
      title: post.title,
      url: `${process.env.NEXT_PUBLIC_ORIGIN_RSS}/posts/${post.slug}`,
      date: post.date,
      description: post.description,
      categories: post.metadata,
      author: "Aaron Bos",
    });
  });

  await fs.writeFile("./public/feed.xml", feed.xml({ indent: true }));
}

generateRssFeed();
