import { NextApiResponse } from "next";

export function handleError(
  res: NextApiResponse,
  err: unknown,
  message: string
): NextApiResponse {
  if (err instanceof Error && !process.env.VERCEL_ENV?.includes("production")) {
    res.status(500).json({ isSuccess: false, message: err.message });
    return res;
  }
  res.status(500).json({
    data: null,
    isSuccess: false,
    message: message,
  });
  return res;
}
