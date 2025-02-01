import { Page, Locator, expect } from '@playwright/test';

export class CartPage {

  private page: Page;
  private checkoutButton :Locator;
  private cartItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = this.page.locator('#checkout'); 
    this.cartItems = this.page.locator('.cart_item'); 
  }

  async proceedToCheckout() {
    try {
      await this.checkoutButton.click();
      console.log('Proceeded to checkout.');
    } catch (error) {
      console.error('Failed to proceed to checkout:', error);
      throw error;
    }
  }

  async verifyCartItems(expectedItems: string | any[]) {
    try {
      const actualItems = await this.cartItems.all();
      expect(actualItems.length).toBe(expectedItems.length);

      for (const expectedItem of expectedItems) {
        const itemLocator = this.page.locator(`//div[text()='${expectedItem}']`); 
        await expect(itemLocator).toBeVisible();
      }
      console.log(`Verified that expected item(s) is/are in the cart.`);
    } catch (error) {
      console.error('Failed to verify cart items:', error);
      throw error;
    }
  }
}