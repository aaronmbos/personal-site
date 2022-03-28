import fetch from "node-fetch";
const postsUri = `${process.env.STRAPI_BASE_URI}/posts`;

export interface BlogPost 
{ 
  id: number,
  title: string,
  content: string,
  slug: string,
  published_at: string,
  date: string,
  description: string,
  metadata: string
}

export async function getRecentPosts() : Promise<BlogPost[]> {
  const res = await fetch(`${postsUri}?_sort=published_at:desc&_limit=5`);
  const rawPosts = await res.json();

  return convertRawPosts(rawPosts);
}

export async function getAllPosts() : Promise<BlogPost[]> {
  // limit=-1 will always return all posts
  const res = await fetch(`${postsUri}?_limit=-1&_sort=published_at:desc`);
  const rawPosts : BlogPost[] = await res.json();

  return convertRawPosts(rawPosts);
}

export async function getPostByUrlId(urlId: string | undefined) {
  const posts = await getAllPosts();
  const post = posts.find((post: BlogPost) => post.slug === urlId);

  return {
    ...post,
  };
}

function convertRawPosts(rawPosts: Array<BlogPost>) {
  return rawPosts.map((post: BlogPost) => {
    post.date = formatDate(post.published_at);
    return post;
  });
}

function formatDate(rawDate: string) : string {
  var options : Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "America/Chicago"
  };
  const date = new Date(rawDate);
  return date.toLocaleDateString("en-US", options);
}
