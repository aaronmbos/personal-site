import { NextApiRequest, NextApiResponse } from "next";
import {
  handleDelete,
  handleGet,
  handlePost,
} from "../../../lib/request-handlers/reaction-request";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const params = parseRequestParams(req);
  const clientIp = getClientIp(req);

  if (req.method === "GET") {
    return res
      .status(200)
      .json(JSON.stringify(await handleGet(params.slug, clientIp)));
  } else if (req.method === "POST") {
    return res
      .status(200)
      .json(
        JSON.stringify(
          await handlePost(
            params.slug,
            clientIp,
            params.type,
            params.currentCount
          )
        )
      );
  } else if (req.method === "DELETE") {
    return res
      .status(200)
      .json(
        JSON.stringify(
          await handleDelete(
            params.slug,
            clientIp,
            params.type,
            params.currentCount
          )
        )
      );
  }
}

interface Params {
  slug: string;
  type: string;
  currentCount: number;
}

function parseRequestParams(req: NextApiRequest): Params {
  const slug = req.query["slug"] as string;
  const type = req.query["type"] as string;
  const currentCount = Number(req.query["count"]);

  return {
    slug,
    type,
    currentCount,
  };
}

function getClientIp(req: NextApiRequest): string {
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
    return req.socket.remoteAddress ?? "";
  }
}
