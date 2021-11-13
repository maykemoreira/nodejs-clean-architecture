module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['!<rootDir>/src/**/*-protocols.ts',
    '!<rootDir>/src/main/**',
    '!**/protocols/**'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  preset: '@shelf/jest-mongodb'
}
