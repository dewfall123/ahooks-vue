module.exports = {
  preset: 'ts-jest',
  collectCoverageFrom: ['src/**/*.ts'],
  moduleNameMapper: {
    '^lodash-es$': 'lodash',
  },
};
