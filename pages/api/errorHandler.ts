import { NextApiResponse } from "next";

export function handleError(
  res: NextApiResponse,
  err: unknown,
  message: string
): void {
  if (err instanceof Error && !process.env.VERCEL_ENV?.includes("production")) {
    res.status(500).json({ isSuccess: false, message: err.message });
  }
  res.status(500).json({
    data: null,
    isSuccess: false,
    message: message,
  });
}
