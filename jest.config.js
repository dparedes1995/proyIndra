module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  coverageReporters: ['text', 'cobertura'],
  coveragePathIgnorePatterns: ['/utils/', '/gateway/', '/.build/'],
}
