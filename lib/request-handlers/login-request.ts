import { LoginRequest, User } from "../../types/api/types";
import query from "../../database/index.js";
import { compare } from "bcrypt";

export async function handlePost(req: LoginRequest): Promise<User> {
  const dbQuery =
    "select username, password from site.user where username = $1";

  const dbRes = await query(dbQuery, [req.username]);
  const user = dbRes.rows[0];

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
