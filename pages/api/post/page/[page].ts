import { NextApiRequest, NextApiResponse } from "next";
import { getPaginatedPosts } from "../../../../lib/posts";

const defaultPageSize = 15;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const params = parseRequestParams(req);

    if (req.method === "GET") {
      const posts = await getPaginatedPosts(params.page, defaultPageSize);
      return res.status(200).json({ isSuccess: true, data: posts });
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
  page: number;
}

function parseRequestParams(req: NextApiRequest): Params {
  const { page } = req.query;

  if (!page || typeof page !== "string") {
    return { page: 1 };
  }

  return {
    page: parseInt(page),
  };
}
