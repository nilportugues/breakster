/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest', 
  testEnvironment: 'jest-environment-jsdom',
  roots: ['<rootDir>/tests/'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    "^.+\\.(js|jsx)$": "babel-jest"
  },
  moduleFileExtensions: ['js','tsx'],
};

