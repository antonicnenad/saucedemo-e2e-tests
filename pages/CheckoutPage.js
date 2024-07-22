class CheckoutPage {
  // Constructor to initialize the page and selectors
  constructor(page) {
    this.page = page;
    this.firstNameInput = 'input[data-test="firstName"]'; // Selector for the first name input field
    this.lastNameInput = 'input[data-test="lastName"]'; // Selector for the last name input field
    this.postalCodeInput = 'input[data-test="postalCode"]'; // Selector for the postal code input field
    this.continueButton = 'input[data-test="continue"]'; // Selector for the continue button
    this.finishButton = 'button[data-test="finish"]'; // Selector for the finish button
    this.completeHeader = ".complete-header"; // Selector for the order completion header
  }

  // Method to fill the checkout form with provided details
  async fillCheckoutForm(firstName, lastName, postalCode) {
    await this.page.fill(this.firstNameInput, firstName); // Fill the first name input field
    await this.page.fill(this.lastNameInput, lastName); // Fill the last name input field
    await this.page.fill(this.postalCodeInput, postalCode); // Fill the postal code input field
    await this.page.click(this.continueButton); // Click the continue button
  }

  // Method to finish the order
  async finishOrder() {
    await this.page.click(this.finishButton); // Click the finish button
  }

  // Method to verify the order completion message
  async verifyOrderCompletion() {
    const headerText = await this.page.textContent(this.completeHeader); // Get the text content of the completion header
    return headerText; // Return the header text for verification
  }
}

module.exports = CheckoutPage; // Exporting the CheckoutPage class for use in other files
