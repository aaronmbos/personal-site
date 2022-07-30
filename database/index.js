import { Pool } from "pg";
import "dotenv/config";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default async function query(text, params) {
  return await pool.query(text, params);
}
