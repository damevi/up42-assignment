import type { PlaywrightTestConfig } from "@playwright/test";

require("dotenv").config();

const config: PlaywrightTestConfig = {
  testDir: "./tests",
  use: {
    baseURL: process.env.BASE_URL,
    actionTimeout: 0,
    trace: "on-first-retry",
  },
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // reporter: "html",
};

export default config;
