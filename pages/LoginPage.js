class LoginPage {
  // Constructor to initialize the page and selectors
  constructor(page) {
    this.page = page;
    this.usernameInput = 'input[data-test="username"]'; // Selector for the username input field
    this.passwordInput = 'input[data-test="password"]'; // Selector for the password input field
    this.loginButton = 'input[data-test="login-button"]'; // Selector for the login button
  }

  // Method to navigate to the SauceDemo website
  async navigate() {
    try {
      console.log("Navigating to SauceDemo website...");
      await this.page.goto("https://www.saucedemo.com/", { timeout: 60000 }); // Navigating to the URL with a timeout of 60 seconds
      console.log("Navigation successful.");
    } catch (error) {
      console.error("Failed to navigate:", error); // Logging any errors that occur during navigation
      throw error; // Rethrowing the error to be handled by the calling function
    }
  }

  // Method to log in to the website
  async login(username, password) {
    await this.page.fill(this.usernameInput, username); // Filling in the username
    await this.page.fill(this.passwordInput, password); // Filling in the password
    await this.page.click(this.loginButton); // Clicking the login button
  }
}

module.exports = LoginPage; // Exporting the LoginPage class for use in other files
