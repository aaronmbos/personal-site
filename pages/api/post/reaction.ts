import { NextApiRequest, NextApiResponse } from "next";
import query from "../../../database/index.js";
export type ReactionType = "like";

export interface Reaction {
  type: ReactionType;
  count: number;
  hasReacted: boolean;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const dbRes = await query(
      "select count(*) as count from post.reaction where slug='test-time' and reaction_type='like'"
    );
    const reactions: Reaction[] = [
      { type: "like", count: dbRes.rows[0].count, hasReacted: false },
    ];
    return res.status(200).json(JSON.stringify(reactions));
  } else if (req.method === "POST") {
    const reactions: Reaction[] = [
      { type: "like", count: 101, hasReacted: true },
    ];
    return res.status(200).json(JSON.stringify(reactions));
  } else if (req.method === "DELETE") {
    const reactions: Reaction[] = [
      { type: "like", count: 100, hasReacted: false },
    ];
    return res.status(200).json(JSON.stringify(reactions));
  }
}

function getClientIp(req: NextApiRequest): string | undefined {
  if (req.headers.forwarded) {
    // Originating IP will be the first entry if multiple
    return req.headers.forwarded!.split(",")[0];
  } else if (req.headers["x-real-ip"]) {
    if (Array.isArray(req.headers["x-real-ip"])) {
      return req.headers["x-real-ip"][0];
    } else {
      return req.headers["x-real-ip"];
    }
  } else {
    return req.socket.remoteAddress;
  }
}
