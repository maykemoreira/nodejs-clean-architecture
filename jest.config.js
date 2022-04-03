module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['!<rootDir>/src/**/*-protocols.ts',
    '!<rootDir>/src/main/**',
    '!**/protocols/**',
    '!**/test/**'
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  preset: '@shelf/jest-mongodb',
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  }
}
