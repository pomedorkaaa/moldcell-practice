import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg"; //для работы ноды и постгре

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("Where is your fkin string");
}

export const pool = new Pool({
  connectionString,
});

export const db = drizzle({
  client: pool,
  logger: true,
});
