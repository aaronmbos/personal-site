import { NextApiRequest, NextApiResponse } from "next";
import { handleError } from "../errorHandler";
import { parseJsonRequest } from "../../../types/api/types";
import sql from "../../../database/db.mjs";
import { Post } from "../../../types/database/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === "GET") {
      const title = req.query["title"];
      if (!title || typeof title !== "string") {
        res.status(400);
      }
      const baseQuery = sql;
      const postTitle = (
        await sql<
          { title: string }[]
        >`select title from post.post where title = ${title as string}`
      )[0];
      res.status(200).json(postTitle);
    } else if (req.method === "POST") {
      res.status(200).json({});
    }
  } catch (error) {
    handleError(res, error, "An error occurred saving the post.");
  }
}
