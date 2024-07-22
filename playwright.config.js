const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  timeout: 60000, // Increase global timeout to 60 seconds
  retries: 2, // Retry failed tests up to 2 times
  use: {
    browserName: "chromium",
    headless: true,
    ignoreHTTPSErrors: true,
    viewport: { width: 1280, height: 720 },
    baseURL: "https://www.saucedemo.com/",
  },
  reporter: [["list"], ["allure-playwright"]],
});
