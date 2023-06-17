// Example:  node ./scripts/update-algolia.mjs '56_announce-search-feature.md'

import algoliasearch from "algoliasearch";
import { v4 as uuidv4 } from "uuid";
import sql from "../database/db.mjs";
import remark from "remark";
import strip from "strip-markdown";

async function updateAlgoliaIndex() {
  const client = algoliasearch(
    process.env.ALGOLIA_APP_ID,
    process.env.ALGOLIA_ADMIN_API_KEY
  );
  const index = client.initIndex("aaronbos_blog_index");

  const postsToIndex =
    await sql`select id, title, content, slug, description, tags, (published_at at time zone 'utc') as published_at from post.post where is_indexed = false and published_at is not null order by published_at desc`;

  postsToIndex.forEach(async (post) => {
    await index.saveObject({
      objectID: uuidv4(),
      title: post.title,
      content: String(await remark().use(strip).process(post.content)),
      slug: post.slug,
      description: post.description,
      metadata: post.tags,
      date: post.published_at,
    });
  });

  await sql`update post.post set is_indexed = true where is_indexed = false and published_at is not null`;

  console.log("Algolia index updated");
}

updateAlgoliaIndex().then(() => process.exit());
