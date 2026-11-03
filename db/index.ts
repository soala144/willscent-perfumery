import "server-only";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required to access the waitlist database.");
}

const globalForDatabase = globalThis as typeof globalThis & {
  willscentSql?: ReturnType<typeof postgres>;
};

const sql =
  globalForDatabase.willscentSql ??
  postgres(databaseUrl, {
    max: 5,
    prepare: false,
    connect_timeout: 8,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDatabase.willscentSql = sql;
}

export const db = drizzle(sql, { schema });
