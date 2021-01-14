import fetch from "node-fetch";
const postsUri = `${process.env.STRAPI_BASE_URI}/posts`;

export async function getRecentPosts() {
  const res = await fetch(`${postsUri}?_sort=published_at:desc&_limit=5`);
  const rawPosts = await res.json();

  return convertRawPosts(rawPosts);
}

export async function getAllPosts() {
  // limit=-1 will always return all posts
  const res = await fetch(`${postsUri}?_limit=-1&_sort=published_at:desc`);
  const rawPosts = await res.json();

  return convertRawPosts(rawPosts);
}

export async function getPostByUrlId(urlId) {
  const posts = await getAllPosts();
  const post = posts.find((post) => post.url_id === urlId);

  return {
    ...post
  };
}

function convertRawPosts(rawPosts) {
  return rawPosts.map((post) => {
    return {
      date: formatDate(post.published_at),
      ...post,
    };
  });
}

function formatDate(rawDate) {
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(rawDate);
  return date.toLocaleDateString(undefined, options);
}
