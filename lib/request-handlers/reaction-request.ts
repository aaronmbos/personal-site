import { Reaction } from "../../types/api/types";
import query from "../../database/index.js";

export async function handleGet(
  slug: string,
  clientIpAddress: string
): Promise<Reaction[]> {
  const text =
    "select count(*) as count, (select 1 from post.reaction where ip_address=$1 and reaction_type='like' and slug=$2) as has_reacted from post.reaction where slug=$2 and reaction_type='like'";
  const values = [clientIpAddress, slug];

  const dbRes = await query(text, values);
  return [
    {
      type: "like",
      count: dbRes.rows[0].count,
      hasReacted: dbRes.rows[0].has_reacted === "1",
    },
  ];
}

export async function handlePost(
  slug: string,
  clientIpAddress: string,
  type: string,
  currentCount: number
): Promise<Reaction[]> {
  const text =
    "insert into post.reaction (slug, ip_address, reaction_type) values ($1, $2, $3)";
  const values = [slug, clientIpAddress, type];

  const dbResult = await query(text, values);
  return [
    {
      type: "like",
      count: currentCount + dbResult.rowCount,
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
  const text =
    "delete from post.reaction where ip_address=$1 and slug=$2 and reaction_type=$3";
  const values = [clientIpAddress, slug, type];

  const dbResult = await query(text, values);
  return [
    {
      type: "like",
      count: currentCount - dbResult.rowCount,
      hasReacted: false,
    },
  ];
}
