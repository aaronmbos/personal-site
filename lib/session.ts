import type { SessionOptions } from "iron-session";
import type { User } from "../types/api/types";

export const sessionOptions: SessionOptions = {
  password: process.env.COOKIE_SECRET as string,
  cookieName: `aaronmbos-${process.env.NODE_ENV}`,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export interface SessionData {
  user?: User;
}
