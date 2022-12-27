/* eslint-env node */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextJest = require("next/jest");

const createJestConfig = nextJest({ dir: "./" });

/** @type {import('jest').Config} */
const customJestConfig = {
  moduleDirectories: ["node_modules", "<rootDir>/"],
  moduleNameMapper: { "^@/(.*)$": "<rootDir>/$1" },
  testEnvironment: "node",
};

module.exports = createJestConfig(customJestConfig);
