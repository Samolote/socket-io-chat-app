export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '^.+\\.svg$': 'jest-transformer-svg',
    '^@/components(.*)$': '<rootDir>/src/components/$1',
    '^@/utilities(.*)$': '<rootDir>/src/utilities/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  coverageReporters: ['text'],
  collectCoverageFrom: [
    'src/components/**/*.{ts,tsx}',
    'src/utilities/*.ts',
    '!src/**/index.ts',
    '!src/components/**/use*.tsx',
  ],
};
