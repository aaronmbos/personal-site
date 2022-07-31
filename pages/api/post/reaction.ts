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
  try {
    throw Error("Oops");
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
  } catch (error) {
    if (error instanceof Error) {
      if (!process.env.VERCEL_ENV?.includes("production")) {
        return res.status(500).json(error.message);
      }

      return res
        .status(500)
        .json(`An error occurred. ${process.env.VERCEL_ENV}`);
    }
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
  if (req.headers["X-Forwarded-For"]) {
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
