import sql from "../database/db.mjs";
import { PagedPost, Post } from "../types/database/types.js";
import { Paged, PostSummary } from "../types/api/types.js";

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  slug: string;
  date: string;
  description: string;
  tags: string[];
}

const baseQuery = sql`select id, title, content, slug, description, tags, (published_at at time zone 'utc') as published_at from post.post where published_at is not null`;

export async function getRecentPosts(): Promise<BlogPost[]> {
  const posts = await sql<
    Post[]
  >`${baseQuery} order by published_at desc limit 5`;
  return posts.map(toBlogPost);
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const posts = await sql<Post[]>`${baseQuery} order by published_at desc`;

  return posts.map(toBlogPost);
}

export async function getPostByUrlId(urlId: string): Promise<BlogPost | never> {
  const post = (await sql<Post[]>`${baseQuery} and slug = ${urlId}`)[0];

  if (!post) {
    throw new Error("No post found with given urlId");
  }

  return toBlogPost(post);
}

export async function getPaginatedPosts(
  page: number,
  pageSize: number
): Promise<Paged<PostSummary>> {
  const offset = (page - 1) * pageSize;
  const posts = await sql<
    PagedPost[]
  >`select id, title, slug, description, tags, (published_at at time zone 'utc') as published_at, count from post.post
    cross join (select count(*) from post.post where published_at is not null) as count
    where published_at is not null
    order by published_at desc
    limit ${pageSize}
    offset ${offset}`;
  const count = posts[0].count;
  return {
    page: page,
    data: posts.map((p) => toPostPreview(p)),
    total: count,
    limit: Math.ceil(count / pageSize),
  };
}

function formatDate(date: Date): string {
  var options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "America/Chicago",
  };
  return date.toLocaleDateString("en-US", options);
}

function toBlogPost(post: Post): BlogPost {
  return {
    id: post.id,
    title: post.title as string,
    content: post.content as string,
    slug: post.slug as string,
    description: post.description as string,
    tags: post.tags as string[],
    date: formatDate(post.published_at!),
  };
}

function toPostPreview(post: PagedPost): PostSummary {
  return {
    id: post.id,
    title: post.title as string,
    slug: post.slug as string,
    description: post.description as string,
    tags: post.tags as string[],
    date: formatDate(post.published_at!),
  };
}
