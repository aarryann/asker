module.exports = {
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
  moduleNameMapper: {
    '\\.(scss|css|jpg|png|gif)$': '<rootDir>/__mocks__/file.mock.ts',
  },
  roots: ['<rootDir>'],
  setupFiles: ['<rootDir>/config/setup.ts'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['<rootDir>[/\\\\](build|docs|node_modules|.next)[/\\\\]'],
  testRegex: '/__tests__/.*\\.(test|spec)\\.tsx?$',
  testURL: 'http://localhost',
  transform: { '^.+\\.(ts|tsx)$': 'babel-jest' },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$'],
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
};
