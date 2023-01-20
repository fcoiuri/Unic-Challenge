module.exports = {
  testEnvironment: 'node',
  verbose: true,
  transform: {
    '^.+\\.ts?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest'
  },
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      isolatedModules: true
    }
  },
  moduleNameMapper: {
    '^axios$': require.resolve('axios')
  },
  transformIgnorePatterns: ['node_modules/(?!react-markdown/)'],
  moduleDirectories: [
    'js',
    '.',
    'node_modules',
    +(
      // add the directory with the test-utils.js file, for example:
      (+'utils')
    ), // a utility folder
    +__dirname // the root directory
  ]
  // ... other options ...
};
