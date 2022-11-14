import { NextApiRequest, NextApiResponse } from "next";
import { handleGet } from "../../../lib/request-handlers/search-request";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const params = parseRequestBody(req.body);
      return res.status(200).json(await handleGet(params.query));
    }
  } catch (error) {
    if (error instanceof Error) {
      if (!process.env.VERCEL_ENV?.includes("production")) {
        return res.status(500).json(error.message);
      }

      return res.status(500).json("An error occurred.");
    }
  }
}

interface Params {
  query: string;
}

function parseRequestBody(body: any): Params {
  return { query: body["query"] };
}
