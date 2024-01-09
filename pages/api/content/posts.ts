import { NextApiRequest, NextApiResponse } from "next";
import { handleError } from "../errorHandler";
import {
  parseJsonRequest,
  PostsPatchRequest,
  PostsRequest,
} from "../../../types/api/types";
import {
  handlePatch,
  handlePost,
  handlePut,
} from "../../../lib/request-handlers/posts-request";
import { SessionData, sessionOptions } from "../../../lib/session";
import { getIronSession } from "iron-session";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getIronSession<SessionData>(req, res, sessionOptions);

    if (!session.user) {
      throw new Error("Unauthorized: No user logged in");
    }

    const postsReq = parseJsonRequest<PostsRequest>(req.body);
    if (req.method === "POST") {
      res.status(200).json(await handlePost(postsReq));
    } else if (req.method === "PUT") {
      res.status(200).json(await handlePut(postsReq));
    } else if (req.method === "PATCH") {
      res
        .status(200)
        .json(await handlePatch(parseJsonRequest<PostsPatchRequest>(req.body)));
    }

    res.status(405);
  } catch (error) {
    handleError(res, error, "An error occurred saving the post.");
  }
}
