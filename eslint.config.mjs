import { defineConfig } from "eslint/config";
import path from "node:path";
import { fileURLToPath } from "node:url";

import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import expoConfig from "eslint-config-expo/flat.js";

import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig([
  {
    ignores: ["dist/*", "src/database/drizzle/**/*", "expo-env.d.ts"],
  },
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
  },

  {
    rules: {
      "prettier/prettier": ["error", { endOfLine: "auto" }],
      "no-console": "error",
    },
  },
]);
