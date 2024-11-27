import createPostImage from "./create-post-image.mjs";
import sql from "../database/db.mjs";

const posts = await getAllPosts();

for (const post of posts) {
  const url = createPostImage(post);
  await updatePost(post.id, url);
}

async function getAllPosts() {
  return await sql`select id, title, slug from post.post where slug <> '' and slug is not null`;
}

async function updatePost(id, url) {
  return await sql`update post.post set image_url = ${url} where id = ${id}`;
}
