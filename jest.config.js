module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{js,jsx}",
    "**/*.{ts,tsx}",
    "!*.js",
    "!.*.js",
    "!**/*.d.ts",
    "!**/.cache/**",
    "!**/coverage/**",
    "!**/node_modules/**",
    "!**/lib/production.js",
    "!**/plugins/**",
    "!**/public/**",
    "!**/scripts/**",
    "!**/src/pages/**",
    "!**/src/templates/**",
  ],
  coverageReporters: ["text", "lcov", "cobertura"],
  reporters: ["default", "jest-junit"],
  transform: {
    "^.+\\.[jt]sx?$": "<rootDir>/jest.preprocess.js",
  },
  moduleNameMapper: {
    "^.+\\.(css|styl|less|sass|scss)$": "identity-obj-proxy",
    "^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
    "typeface-.+": "identity-obj-proxy",
  },
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ["node_modules", ".cache"],
  transformIgnorePatterns: ["node_modules/(?!(gatsby)/)"],
  globals: {
    __PATH_PREFIX__: "",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
}
