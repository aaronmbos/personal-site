// Example usage: node ./scripts/update-post-image.mjs '"Hello, world!"'

import sql from "../database/db.mjs";
import createPostImage from "./create-post-image.mjs";

// The post's slug should be passed to the script
const postSlug = process.argv[2];

const post = await getPost(postSlug);

const postUrl = createPostImage(post);

await updatePostImageUrl(post.Id, postUrl);

process.exit(0);

async function getPost(slug) {
  if (!slug) {
    console.log("You need to provide a post slug.");
    process.exit(1);
  }

  const post = (
    await sql`select id, title, slug from post.post where slug=${slug}`
  )[0];

  if (!post) {
    console.log(`No post found with the provided slug: "${slug}"`);
    process.exit(1);
  }

  return post;
}

async function updatePostImageUrl(id, url) {
  await sql`update post.post set image_url = ${url} where id = ${id} `;
}
