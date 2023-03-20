import { NextApiRequest, NextApiResponse } from "next";
import { handlePost } from "../../../lib/request-handlers/login-request";
import { handleError } from "../errorHandler";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const params = parseRequestBody(req.body);
    if (req.method === "POST") {
      const user = await handlePost({
        username: params.username,
        password: params.password,
      });
      res.status(200).json({
        data: user,
        isSuccess: true,
      });
      return res;
    }
    res.status(405);
  } catch (error) {
    return handleError(res, error, "An error occurred during login.");
  }
}

interface Params {
  username: string;
  password: string;
}

const parseRequestBody = (body: string): Params => {
  return JSON.parse(body) as Params;
};
