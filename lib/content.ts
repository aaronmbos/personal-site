import sql from "../database/db.mjs";
import { Post } from "../types/database/types";

export interface PostTableRow {
  id: string;
  title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export async function getPostTable(): Promise<PostTableRow[]> {
  const rows = await sql<
    Post[]
  >`select id, title, slug, (created_at at time zone 'utc') as created_at, (updated_at at time zone 'utc') as updated_at, (published_at at time zone 'utc') published_at from post.post`;

  return rows.map(toPostTableRow);
}

function toPostTableRow(post: Post): PostTableRow {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    createdAt: post.created_at.toString(),
    updatedAt: post.updated_at.toString(),
    publishedAt: post.published_at?.toString(),
  };
}
