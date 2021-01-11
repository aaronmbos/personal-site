import fetch from 'node-fetch';
const postsUri = `${process.env.STRAPI_BASE_URI}/posts`;

export async function getRecentPosts() {
  const res = await fetch(postsUri);
  const rawPosts = await res.json();
  const posts = rawPosts.map((post) => {
    const date = new Date(post.published_at);
    return {
      date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getUTCDate()}`,
      ...post
    }
  })
  return posts;
}