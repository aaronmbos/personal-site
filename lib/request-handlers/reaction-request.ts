import { Reaction } from "../../types/api/types";
import sql from "../../database/db.mjs";

export async function handleGet(
  slug: string,
  clientIpAddress: string
): Promise<Reaction[]> {
  const dbResponse = (
    await sql`select count(*) as count, (select 1 from post.reaction where ip_address=${clientIpAddress} and reaction_type='like' and slug=${slug}) as has_reacted from post.reaction where slug=${slug} and reaction_type='like'`
  )[0];

  return [
    {
      type: "like",
      count: dbResponse.count,
      hasReacted: dbResponse.has_reacted === "1",
    },
  ];
}

export async function handlePost(
  slug: string,
  clientIpAddress: string,
  type: string,
  currentCount: number
): Promise<Reaction[]> {
  const dbResponse =
    await sql`insert into post.reaction (slug, ip_address, reaction_type) values (${slug}, ${clientIpAddress}, ${type})`;

  return [
    {
      type: "like",
      count: currentCount + dbResponse.count,
      hasReacted: true,
    },
  ];
}

export async function handleDelete(
  slug: string,
  clientIpAddress: string,
  type: string,
  currentCount: number
): Promise<Reaction[]> {
  const dbResponse =
    await sql`delete from post.reaction where ip_address=${clientIpAddress} and slug=${slug} and reaction_type=${type}`;

  return [
    {
      type: "like",
      count: currentCount - dbResponse.count,
      hasReacted: false,
    },
  ];
}
