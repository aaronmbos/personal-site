import sql from "../database/db.mjs";
import { Post } from "../types/database/types";

export type PostTableRow = Pick<
  Post,
  "id" | "title" | "slug" | "created_at" | "updated_at" | "published_at"
>;

export async function getPostTable(): Promise<PostTableRow[]> {
  const rows = await sql<
    PostTableRow[]
  >`select id, title, slug, created_at, updated_at, published_at from post.post`;

  console.log(rows);

  return rows;
}
