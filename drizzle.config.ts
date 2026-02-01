import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/database/schemas/index.ts",
  out: "./src/database/drizzle",
  dialect: "sqlite",
  driver: "expo",
});
