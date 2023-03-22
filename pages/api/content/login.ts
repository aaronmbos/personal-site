import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { handlePost } from "../../../lib/request-handlers/login-request";
import { handleError } from "../errorHandler";
import { sessionOptions } from "../../../lib/session";

export default withIronSessionApiRoute(handler, sessionOptions);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const params = parseRequestBody(req.body);
    if (req.method === "POST") {
      const user = await handlePost({
        username: params.username,
        password: params.password,
      });

      req.session.user = user;
      await req.session.save();

      res.status(200).json({
        data: user,
        isSuccess: true,
      });
    }
    res.status(405);
  } catch (error) {
    handleError(res, error, "An error occurred during login.");
  }
}

interface Params {
  username: string;
  password: string;
}

const parseRequestBody = (body: string): Params => {
  return JSON.parse(body) as Params;
};
