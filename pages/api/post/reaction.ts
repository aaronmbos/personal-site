import { NextApiRequest, NextApiResponse } from "next";

export type ReactionType = "like";

export interface Reaction {
  type: ReactionType;
  count: number;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const reactions: Reaction[] = [{ type: "like", count: 100 }];
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
