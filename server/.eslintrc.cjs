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
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn'
  },
  globals: {
    process: 'readonly',
    console: 'readonly',
    describe: 'readonly',
    it: 'readonly',
    expect: 'readonly',
    jest: 'readonly'
  }
};
