import { LoginRequest, User } from "../../types/api/types";
import { compare } from "bcrypt";
import sql from "../../database/db.mjs";

export async function handlePost(req: LoginRequest): Promise<User> {
  const user = (
    await sql`select username, password from site.user where username = ${req.username}`
  )[0];

  if (user) {
    if (await compare(req.password, user.password)) {
      return {
        username: req.username,
        isLoggedIn: true,
      };
    }
    throw Error("Invalid password.");
  }
  throw Error(`No user found with username ${req.username}.`);
}
