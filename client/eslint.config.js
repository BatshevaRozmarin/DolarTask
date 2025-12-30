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
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        window: "readonly",
        document: "readonly",
        HTMLElement: "readonly",
        fetch: "readonly",
        console: "readonly",
      },
    },
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooks,
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
