import sql from "../database/db.mjs";

interface Note {
  id: string;
  title: string;
  author: string;
  url: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export async function getAllNotes(): Promise<Note[]> {
  const notes = await sql<
    Note[]
  >`select id, title, author, url, content, (created_at at time zone 'utc') as CreatedAt, (updated_at at time zone 'utc') as UpdatedAt
  from note.note
  order by created_at desc`;
  return notes;
}
