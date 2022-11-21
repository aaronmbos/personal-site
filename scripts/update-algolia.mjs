// Example:  node ./scripts/update-algolia.mjs '56_announce-search-feature.md'

import dotenv from "dotenv";
import algoliasearch from "algoliasearch";
import { readdir, writeFile } from "fs/promises";
import path from "path";
import matter from "gray-matter";
import remark from "remark";
import strip from "strip-markdown";
import { v4 as uuidv4 } from "uuid";

const fileNameArg = process.argv[2];

dotenv.config();
const client = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_ADMIN_API_KEY
);
const index = client.initIndex("aaronbos_blog_index");

const postsDir = path.join(process.cwd(), "_posts");
const files = await readdir(postsDir);
const postToUpdate = files.find((n) => n === fileNameArg);

if (!postToUpdate) {
  throw Error("Can't find requested post");
}

const matterPost = matter.read(`${postsDir}/${postToUpdate}`);
const rawContent = await remark().use(strip).process(matterPost.content);

await index.saveObject({
  objectID: uuidv4(),
  title: matterPost.data.title,
  content: String(rawContent),
  slug: matterPost.data.slug,
  description: matterPost.data.description,
  metadata: matterPost.data.metadata.split(","),
  date: matterPost.data.publishedAt,
});
