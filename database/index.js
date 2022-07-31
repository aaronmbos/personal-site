import { Pool } from "pg";
import "dotenv/config";
import { config } from "./config";

const pool = new Pool(config);

export default async function query(text, params) {
  return await pool.query(text, params);
}
