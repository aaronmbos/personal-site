import "dotenv/config.js";
import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL, {
  //  ssl: {
  //    caCerts: [process.env.CERT],
  //  },
});

export default sql;
