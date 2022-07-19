import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return res.status(200).json(`${req.query["slug"]}: ${getClientIp(req)}`);
  }
}

function getClientIp(req: NextApiRequest): string | undefined {
  if (req.headers.forwarded) {
    // Originating IP will be the first entry if multiple
    return req.headers.forwarded!.split(",")[0];
  } else if (req.headers["x-real-ip"]) {
    if (Array.isArray(req.headers["x-real-ip"])) {
      return req.headers["x-real-ip"][0];
    } else {
      return req.headers["x-real-ip"];
    }
  } else {
    return req.socket.remoteAddress;
  }
}
