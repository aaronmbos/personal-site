import "dotenv/config.js";
import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL, {
  transform: { undefined: null },
});

export default sql;
