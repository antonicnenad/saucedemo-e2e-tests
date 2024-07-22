class InventoryCartPage {
  // Constructor to initialize the page and selectors
  constructor(page) {
    this.page = page;
    this.cartBadge = ".shopping_cart_badge"; // Selector for the cart badge showing item count
    this.sortSelect = ".product_sort_container"; // Selector for the sorting dropdown
    this.cartItems = ".cart_item"; // Selector for the cart items
  }

  // Method to add an item to the cart based on the item name
  async addItemToCart(itemName) {
    const button = this.page.locator(`[data-test="add-to-cart-${itemName}"]`); // Dynamic locator for the add to cart button
    await button.waitFor({ state: "visible" }); // Wait until the button is visible
    await button.click(); // Click the add to cart button
  }

  // Method to verify the cart badge displays the expected count of items
  async verifyCartBadge(expectedCount) {
    const badge = this.page.locator(this.cartBadge); // Locator for the cart badge
    await badge.waitFor({ state: "visible" }); // Wait until the badge is visible
    const badgeText = await badge.textContent(); // Get the text content of the badge
    return badgeText.trim() === expectedCount; // Compare the badge text with the expected count
  }

  // Method to open item details page by item name
  async openItemDetailsByName(itemName) {
    const item = this.page.locator(`.inventory_item_name`, {
      hasText: itemName, // Locator for the item name with the specified text
    });
    await item.waitFor({ state: "visible" }); // Wait until the item name is visible
    await item.click(); // Click the item name to open details
  }

  // Method to add an item to the cart from the item details page
  async addToCartFromItemPage() {
    const button = this.page.locator('[data-test="add-to-cart"]'); // Locator for the add to cart button on item details page
    await button.waitFor({ state: "visible" }); // Wait until the button is visible
    await button.click(); // Click the add to cart button
  }

  // Method to verify the items present in the cart
  async verifyCartItems(expectedItems) {
    const itemNames = await this.page.$$eval(".inventory_item_name", (items) =>
      items.map((item) => item.textContent)
    ); // Get the text content of all item names in the cart
    console.log("Cart Items:", itemNames); // Log the cart items for debugging
    return (
      JSON.stringify(itemNames.sort()) === JSON.stringify(expectedItems.sort())
    ); // Compare the sorted list of cart items with the expected items
  }

  // Method to remove an item from the cart based on the item name
  async removeItemFromCart(itemName) {
    const button = this.page.locator(`[data-test="remove-${itemName}"]`); // Dynamic locator for the remove button
    await button.waitFor({ state: "visible" }); // Wait until the button is visible
    await button.click(); // Click the remove button
  }

  // Method to proceed to the checkout page
  async proceedToCheckout() {
    const button = this.page.locator('[data-test="checkout"]'); // Locator for the checkout button
    await button.waitFor({ state: "visible" }); // Wait until the button is visible
    await button.click(); // Click the checkout button
  }

  // Method to sort items based on the selected option
  async sortItems(option) {
    await this.page.selectOption(this.sortSelect, option); // Select the sorting option from the dropdown
  }

  // Method to get the names of all items
  async getItemNames() {
    return this.page.$$eval(".inventory_item_name", (items) =>
      items.map((item) => item.textContent)
    ); // Get the text content of all item names
  }

  // Method to get the prices of all items
  async getItemPrices() {
    return this.page.$$eval(".inventory_item_price", (items) =>
      items.map((item) => parseFloat(item.textContent.replace("$", "")))
    ); // Get the prices of all items as floating point numbers
  }
}

module.exports = InventoryCartPage; // Exporting the InventoryCartPage class for use in other files
