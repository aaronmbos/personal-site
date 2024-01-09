import { NextApiRequest, NextApiResponse } from "next";
import { handlePost } from "../../../lib/request-handlers/login-request";
import { handleError } from "../errorHandler";
import { sessionOptions, SessionData } from "../../../lib/session";
import { LoginRequest, parseJsonRequest } from "../../../types/api/types";
import { getIronSession } from "iron-session";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getIronSession<SessionData>(req, res, sessionOptions);
    const loginReq = parseJsonRequest<LoginRequest>(req.body);
    if (req.method === "POST") {
      const user = await handlePost(loginReq);

      session.user = user;
      await session.save();

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
