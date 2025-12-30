module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  moduleFileExtensions: ['ts', 'js', 'json'],

  testMatch: [
    '<rootDir>/tests/**/*.test.ts'
  ],

  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json'
    }
  },

  clearMocks: true
};
