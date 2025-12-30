module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  env: {
    node: true,
    jest: true,
    es2020: true
  },
  globals: {
    process: 'readonly',
    console: 'readonly'
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn'
  },
  overrides: [
    {
      files: ['**/*.ts'],
    }
  ]
};
