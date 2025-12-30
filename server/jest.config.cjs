export default [
  js.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: "module",
    },
    env: {
      node: true,   
      jest: true,   
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
  },
];
