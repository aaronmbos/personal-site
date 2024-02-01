import { NextApiRequest, NextApiResponse } from "next";
import { getIronSession } from "iron-session";
import { handleError } from "../errorHandler";
import { SessionData, sessionOptions } from "../../../lib/session";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getIronSession<SessionData>(req, res, sessionOptions);
    if (req.method === "POST") {
      session.destroy();

      res.status(200).json({
        isSuccess: true,
      });
    }
    res.status(405);
  } catch (error) {
    handleError(res, error, "An error occurred during logout.");
  }
}
