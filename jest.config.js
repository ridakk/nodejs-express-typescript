const config = require('config'); // eslint-disable-line @typescript-eslint/no-var-requires

module.exports = {
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
    },
    sharedTestData: {},
  },
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testMatch: ['**/*.test.(ts|js)'],
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  verbose: true,
  testURL: `http://localhost:${config.port}/`,
};
