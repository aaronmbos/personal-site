import { NextApiRequest, NextApiResponse } from "next";
import { getPaginatedPosts } from "../../../../lib/posts";
import { handleError } from "../../errorHandler";
import { PostPageRequest } from "../../../../types/api/types";

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
    handleError(
      res,
      error,
      "An error occurred getting posts. Please try again later."
    );
  }
}

function parseRequestParams(req: NextApiRequest): PostPageRequest {
  const { page } = req.query;

  if (!page || typeof page !== "string") {
    return { page: 1 };
  }

  return {
    page: parseInt(page),
  };
}
