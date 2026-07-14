import { config as loadEnv } from "dotenv";
import { defineConfig } from "prisma/config";

// Prisma 7 no longer reads the connection URL from schema.prisma.
// The CLI (migrate / db push / seed) reads it from here instead.
// Locally we load it from .env.local; in CI/prod DATABASE_URL is already in the environment.
loadEnv({ path: ".env.local" });
loadEnv();

export default defineConfig({
  schema: "prisma/schema.prisma",
  ...(process.env.DATABASE_URL
    ? { datasource: { url: process.env.DATABASE_URL } }
    : {}),
  migrations: {
    seed: "tsx prisma/seed.ts",
  },
});
