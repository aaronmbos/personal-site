import postgres from "postgres";
import sql from "../database/db.mjs";

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  slug: string;
  date: string;
  description: string;
  metadata: string[];
}

export async function getRecentPosts(): Promise<BlogPost[]> {
  const posts =
    await sql`select id, title, content, slug, description, tags, published_at from post.post order by published_at desc limit 5`;
  return posts.map(toBlogPost);
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const posts =
    await sql`select id, title, content, slug, description, tags, published_at from post.post order by published_at desc`;

  return posts.map(toBlogPost);
}

export async function getPostByUrlId(urlId: string): Promise<BlogPost | never> {
  const post = (
    await sql`select id, title, content, slug, description, tags, published_at from post.post where slug = ${urlId}`
  )[0];

  if (!post) {
    throw new Error("No post found with given urlId");
  }

  return toBlogPost(post);
}

function formatDate(rawDate: string): string {
  var options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "America/Chicago",
  };
  const date = new Date(rawDate);
  return date.toLocaleDateString("en-US", options);
}

function toBlogPost(post: postgres.Row): BlogPost {
  return {
    id: post.id as string,
    title: post.title as string,
    content: post.content as string,
    slug: post.slug as string,
    description: post.description as string,
    metadata: post.tags as string[],
    date: formatDate(post.published_at as string),
  };
}
