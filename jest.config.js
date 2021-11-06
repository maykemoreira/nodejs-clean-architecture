module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['!<rootDir>/src/**/*-protocols.ts',
    '!**/protocols/**'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  preset: '@shelf/jest-mongodb'
}
