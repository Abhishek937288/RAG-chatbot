import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";


config({ path: "env" });

export default defineConfig({
  schema: "./lib/db-schema.ts",
  out: "./migration",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.NEON_DATABASE_URL!,
  },
});
