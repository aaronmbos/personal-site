import dotenv from "dotenv";
import algoliasearch from "algoliasearch";
import path from "path";
import fs from "fs/promises";
import matter from "gray-matter";
import remark from "remark";
import strip from "strip-markdown";
import { v4 as uuidv4 } from "uuid";

export async function run() {
  dotenv.config();
  const client = algoliasearch(
    process.env.ALGOLIA_APP_ID,
    process.env.ALGOLIA_ADMIN_API_KEY
  );

  const index = client.initIndex("aaronbos_blog_index");

  const postsDir = path.join(process.cwd(), "_posts");
  const posts = await fs.readdir(postsDir);

  const rawPosts = await Promise.all(
    posts.map(async (post) => {
      const matterPost = matter.read(`${postsDir}/${post}`);
      let rawContent = await remark().use(strip).process(matterPost.content);
      return {
        objectID: uuidv4(),
        title: matterPost.data.title,
        content: String(rawContent),
        slug: matterPost.data.slug,
        description: matterPost.data.description,
        metadata: matterPost.data.metadata.split(","),
        date: matterPost.data.publishedAt,
      };
    })
  );

  await index.saveObjects(rawPosts);
}

await run();
