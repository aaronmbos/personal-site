import path from "path";
import fs from "fs/promises";
import matter from "gray-matter";
import sql from "../database/db.mjs";

export async function run() {
  const postsDir = path.join(process.cwd(), "_posts");
  const posts = await fs.readdir(postsDir);

  const rawPosts = await Promise.all(
    posts.map((post) => {
      const matterPost = matter.read(`${postsDir}/${post}`);
      return {
        title: matterPost.data.title,
        content: matterPost.content,
        slug: matterPost.data.slug,
        description: matterPost.data.description,
        tags: matterPost.data.metadata.split(","),
        publishedAt: matterPost.data.publishedAt,
      };
    })
  );

  rawPosts.forEach(async (post) => {
    await sql`insert into post.post (title, slug, content, description, tags, published_at) values(${post.title}, ${post.slug}, ${post.content}, ${post.description}, ${post.tags}, ${post.publishedAt})`;
  });

  return;
}

await run();
