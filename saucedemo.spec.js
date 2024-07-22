const { test, expect } = require("@playwright/test");
const LoginPage = require("./pages/LoginPage");
const InventoryCartPage = require("./pages/InventoryCartPage");
const CheckoutPage = require("./pages/CheckoutPage");
const data = require("./data.json");

test.describe("SauceDemo E2E Tests", () => {
  // This hook runs before each test in the suite
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    console.log("Running beforeEach: Navigating and logging in");
    try {
      // Navigate to the login page and log in using credentials from data.json
      await loginPage.navigate();
      await loginPage.login(
        data.credentials.username,
        data.credentials.password
      );
    } catch (error) {
      console.error("Error in beforeEach hook:", error);
      throw error;
    }
  }, 60000); // Increase timeout to 60 seconds

  // Test to ensure an order can be completed successfully
  test("An order can be completed", async ({ page }) => {
    console.log("Test: An order can be completed");
    const inventoryCartPage = new InventoryCartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Add first item to the cart
    console.log(`Adding first item to the cart: ${data.items.firstItem}`);
    await inventoryCartPage.addItemToCart(data.items.firstItem);
    expect(
      await inventoryCartPage.verifyCartBadge(data.cart.expectedCartBadge)
    ).toBe(true);

    // Open another item's details page and add it to the cart
    console.log(
      `Opening item details and adding to the cart: ${data.items.secondItem}`
    );
    await inventoryCartPage.openItemDetailsByName(data.items.secondItem);
    await inventoryCartPage.addToCartFromItemPage();

    // Open the cart and verify both items are present
    await page.click(data.cart.cartLink);
    const cartItems = await inventoryCartPage.verifyCartItems(
      data.cart.expectedItems
    );
    console.log("Expected Items:", data.cart.expectedItems);
    console.log("Actual Cart Items:", cartItems);
    expect(cartItems).toBe(true);

    // Remove the first item from the cart and verify the remaining item
    console.log(`Removing first item from the cart: ${data.items.firstItem}`);
    await inventoryCartPage.removeItemFromCart(data.items.firstItem);
    expect(
      await inventoryCartPage.verifyCartItems(data.cart.remainingItem)
    ).toBe(true);

    // Proceed to the checkout page
    console.log("Proceeding to checkout");
    await inventoryCartPage.proceedToCheckout();

    // Complete the checkout form and finish the order
    console.log("Filling checkout form and finishing order");
    await checkoutPage.fillCheckoutForm(
      data.user.firstName,
      data.user.lastName,
      data.user.postalCode
    );
    await checkoutPage.finishOrder();

    // Verify the order completion message
    const orderCompletionMessage = await checkoutPage.verifyOrderCompletion();
    expect(orderCompletionMessage).toBe(data.messages.orderCompletion);
  }, 60000); // Increase timeout to 60 seconds

  // Test to ensure items can be sorted correctly
  test("Items can be sorted", async ({ page }) => {
    console.log("Test: Items can be sorted");
    const inventoryCartPage = new InventoryCartPage(page);

    const itemNames = await inventoryCartPage.getItemNames();

    // Sort items from Z to A and verify
    await inventoryCartPage.sortItems("za");
    const sortedZA = await inventoryCartPage.getItemNames();
    expect(sortedZA).toEqual([...itemNames].sort().reverse());

    // Sort items from low to high price and verify
    await inventoryCartPage.sortItems("lohi");
    const sortedLowToHigh = await inventoryCartPage.getItemPrices();
    expect(sortedLowToHigh).toEqual([...sortedLowToHigh].sort((a, b) => a - b));

    // Sort items from high to low price and verify
    await inventoryCartPage.sortItems("hilo");
    const sortedHighToLow = await inventoryCartPage.getItemPrices();
    expect(sortedHighToLow).toEqual([...sortedHighToLow].sort((a, b) => b - a));
  });

  // Test to ensure incorrect credentials cannot log in
  test("Cannot login with incorrect credentials", async ({ page }) => {
    console.log("Test: Cannot login with incorrect credentials");
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login("wrong_user", "wrong_pass");
    // Verify the error message for incorrect credentials
    expect(await page.textContent('h3[data-test="error"]')).toContain(
      data.messages.loginError
    );
  });
});
