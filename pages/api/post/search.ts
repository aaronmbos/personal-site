import { NextApiRequest, NextApiResponse } from "next";
import { handleGet } from "../../../lib/request-handlers/search-request";
import { handleError } from "../errorHandler";
import { SearchRequest } from "../../../types/api/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const params = parseRequestBody(req.body);
      res.status(200).json(await handleGet(params.query));
    }
  } catch (error) {
    handleError(
      res,
      error,
      "An error occurred performing your search. Please try again later."
    );
  }
}

function parseRequestBody(body: any): SearchRequest {
  return { query: body["query"] };
}
