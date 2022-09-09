const fs = require("fs");
const fetch = require("node-fetch");
const dotenv = require("dotenv");

dotenv.config();
const postsUri = `${process.env.STRAPI_BASE_URI_RSS}/posts`;

async function importPosts() {
  const res = await fetch(`${postsUri}?_limit=-1&_sort=published_at:desc`);
  const rawPosts = await res.json();
  let postId = rawPosts.length;

  rawPosts.map((post) => {
    let grayMatter = "---\n";
    grayMatter += `id: ${postId}\n`;
    grayMatter += `slug: ${post.slug}\n`;
    grayMatter += `title: "${post.title}"\n`;
    grayMatter += `description: ${post.description}\n`;
    grayMatter += `publishedAt: ${post.published_at}\n`;
    grayMatter += `updatedAt: ${post.updated_at}\n`;
    grayMatter += `metadata: ${post.metadata
      .map((tag) => tag.tag)
      .join(",")}\n`;
    grayMatter += "---\n";
    grayMatter += post.content;

    fs.writeFileSync(`./_posts/${postId}_${post.slug}.md`, grayMatter);
    postId--;
  });
}

importPosts();
