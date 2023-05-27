import sql from "../database/db.mjs";
import { Post } from "../types/database/types";

export type PostTableRow = Pick<
  PostContent,
  "id" | "title" | "slug" | "createdAt" | "updatedAt" | "publishedAt"
>;

export interface PostContent {
  id: string;
  title: string;
  slug: string;
  content?: string | null;
  description?: string | null;
  tags?: string[] | null;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string | null;
}

export async function getPostTable(): Promise<PostTableRow[]> {
  const rows = await sql<
    Post[]
  >`select id, title, slug, (created_at at time zone 'utc') as created_at, (updated_at at time zone 'utc') as updated_at, (published_at at time zone 'utc') published_at
  from post.post order by published_at desc NULLS FIRST, created_at desc, updated_at desc`;

  return rows.map(toPostTableRow);
}

export async function getPostById(id: string): Promise<PostContent> {
  const post = await sql<
    Post[]
  >`select id, title, slug, content, description, tags, (created_at at time zone 'utc') as created_at, (updated_at at time zone 'utc') as updated_at, (published_at at time zone 'utc') published_at
  from post.post
  where id = ${id}`;

  if (post) {
    return toPostContent(post[0]);
  }
  throw new Error(`No posts found with provided id ${id}`);
}

function toPostTableRow(post: Post): PostTableRow {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    createdAt: post.created_at.toString(),
    updatedAt: post.updated_at.toString(),
    publishedAt: post.published_at?.toString() ?? null,
  };
}

function toPostContent(post: Post): PostContent {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    content: post.content ?? null,
    description: post.description ?? null,
    tags: post.tags,
    createdAt: post.created_at.toString(),
    updatedAt: post.updated_at.toString(),
    publishedAt: post.published_at?.toString() ?? null,
  };
}
