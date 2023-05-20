import { NextApiRequest, NextApiResponse } from "next";
import { handleError } from "../errorHandler";
import { parseJsonRequest, PostsRequest } from "../../../types/api/types";
import { handlePut } from "../../../lib/request-handlers/posts-request";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const postsReq = parseJsonRequest<PostsRequest>(req.body);
    if (req.method === "POST") {
    } else if (req.method === "PUT") {
      res.status(200).json(await handlePut(postsReq));
    }

    res.status(405);
  } catch (error) {
    handleError(res, error, "An error occurred saving the post.");
  }
}
