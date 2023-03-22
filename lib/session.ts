import type { IronSessionOptions } from "iron-session";
import type { User } from "../types/api/types";

export const sessionOptions: IronSessionOptions = {
  password: process.env.COOKIE_SECRET as string,
  cookieName: `aaronmbos-${process.env.NODE_ENV}`,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

// This is where we specify the typings of req.session.*
declare module "iron-session" {
  interface IronSessionData {
    user?: User;
  }
}
