import { NextApiRequest, NextApiResponse } from "next";
import { handleGet } from "../../../lib/request-handlers/search-request";
import { handleError } from "../errorHandler";

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
    return handleError(
      res,
      error,
      "An error occurred performing your search. Please try again later."
    );
  }
}

interface Params {
  query: string;
}

function parseRequestBody(body: any): Params {
  return { query: body["query"] };
}
