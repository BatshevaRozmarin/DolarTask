import js from "@eslint/js";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  js.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: "module",
    },
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooks,
      "@typescript-eslint": tsPlugin,
    },
    rules: {
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
