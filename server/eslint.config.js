export default [
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
      }
    },
    env: {
      node: true,
      jest: true,
      es2020: true
    },
    globals: {
      process: "readonly",
      console: "readonly",
      jest: "readonly",
      describe: "readonly",
      it: "readonly",
      expect: "readonly"
    },
    plugins: ["@typescript-eslint"],
    rules: {
      "@typescript-eslint/no-unused-vars": "warn"
    }
  }
];
