module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{js,jsx}",
    "!*.js",
    "!.*.js",
    "!**/coverage/**",
    "!**/node_modules/**",
    "!**/public/**",
  ],
  coverageReporters: ["text", "lcov", "cobertura"],
  reporters: ["default", "jest-junit"],
  transform: {
    "^.+\\.jsx?$": "<rootDir>/jest.preprocess.js",
  },
  moduleNameMapper: {
    "^.+\\.(css|styl|less|sass|scss)$": "identity-obj-proxy",
    "^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
    "typeface-.+": "identity-obj-proxy",
  },
  testPathIgnorePatterns: ["node_modules", ".cache"],
  transformIgnorePatterns: ["node_modules/(?!(gatsby)/)"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  globals: {
    __PATH_PREFIX__: "",
  },
  setupFiles: ["<rootDir>/jest.setup.js"],
}
