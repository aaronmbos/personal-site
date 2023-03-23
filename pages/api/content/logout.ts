import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { handleError } from "../errorHandler";
import { sessionOptions } from "../../../lib/session";

export default withIronSessionApiRoute(handler, sessionOptions);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "POST") {
      req.session.destroy();

      res.status(200).json({
        isSuccess: true,
      });
    }
    res.status(405);
  } catch (error) {
    handleError(res, error, "An error occurred during logout.");
  }
}
