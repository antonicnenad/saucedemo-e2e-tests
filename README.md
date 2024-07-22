# SauceDemo E2E Tests with Playwright and Allure Reporting

This repository contains end-to-end tests for the [SauceDemo web store](https://www.saucedemo.com/) using Playwright. The tests are organized using the Page Object Model (POM) for better readability and maintainability. The test data, including credentials and user information, are stored in a JSON file. Allure is used for generating detailed test reports.

## Project Structure

.
├── data.json
├── pages
│ ├── InventoryCartPage.js
│ ├── CheckoutPage.js
│ └── LoginPage.js
├── saucedemo.spec.js
├── package.json
├── playwright.config.js
├── Dockerfile
└── README.md

- **data.json**: Contains credentials and user data.
- **pages**: Directory containing POM classes for different pages of the SauceDemo site.
  - **InventoryCartPage.js**: Combined Page Object Model for inventory and cart pages.
  - **CheckoutPage.js**: Page Object Model for the checkout page.
  - **LoginPage.js**: Page Object Model for the login page.
- **saucedemo.spec.js**: Test script containing the end-to-end tests.
- **package.json**: Project configuration and dependencies.
- **playwright.config.js**: Playwright configuration with Allure reporter setup.
- **Dockerfile**: Dockerfile to containerize the project.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/) (optional)
- (Optional) [Docker Compose](https://docs.docker.com/compose/)
- [Allure Commandline](https://docs.qameta.io/allure/#_get_started)

## Setup

1. Clone the repository:

```bash
  git clone https://github.com/yourusername/saucedemo-e2e-tests.git
  cd saucedemo-e2e-tests
```

2. Install the dependencies:

```bash
   npm install
```

3. Ensure you have Playwright and Allure installed:

```bash
   npx playwright install
  brew install allure
```

## Running the Tests

### Locally

To run the Playwright tests locally, use the following command:

```bash
  npm test
```

Using Docker
Build the Docker image:

```bash
  docker build -t saucedemo-e2e-tests .
```

Run the Docker container:

```bash
  docker run --rm saucedemo-e2e-tests
```

## Generating Allure Reports

To generate and view the Allure report, use the following command:

```bash
  npm run allure:report
```

## Test Details

1. Test: An order can be completed

   Log in to the site (done in beforeEach).
   Add an item to the cart.
   Verify the cart badge is updated.
   Open another item's details and add it to the cart.
   Verify the correct items are in the cart.
   Remove an item and verify the remaining item.
   Complete the checkout process and verify the order completion.

2. Test: Items can be sorted

   Log in to the site (done in beforeEach).
   Verify the default sorting by name (A to Z).
   Change the sorting to name (Z to A) and verify.
   Change the sorting to price (low to high) and verify.
   Change the sorting to price (high to low) and verify.

3. Test: Cannot login with incorrect credentials

   Attempt to log in with incorrect credentials.
   Verify the error message.

## Project Configuration and Dependencies

Ensure package.json has the correct scripts for running tests and generating reports:

```json
{
  "scripts": {
    "test": "npx playwright test",
    "allure:report": "allure generate ./allure-results --clean -o ./allure-report && allure open ./allure-report"
  }
}
```

## Playwright Configuration

Ensure your playwright.config.js is set up to use the Allure reporter:

```javascript
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
```
