import { Page, Locator,expect } from '@playwright/test';

export class InventoryPage {
  private page: Page;
  private addToCartButton : any;
  private shoppingCartLink : Locator;
    
  constructor(page: Page) {
    this.page = page;
    this.addToCartButton = (productName) => this.page.locator(`//div[contains(@class, 'inventory_item_description')]//div[contains(text(), '${productName}')]//..//..//..//button`);
    this.shoppingCartLink = this.page.locator('#shopping_cart_container');
  }

  async addProductToCart(productName) {
    try {
      const button = this.addToCartButton(productName);
      await button.click();
      console.log(`Added "${productName}" to cart.`);
    } catch (error) {
      console.error(`Failed to add "${productName}" to cart:`, error);
      throw error; // Re-throw the error to fail the test
    }
  }

  async removeProductFromCart(productName) {
    try {
      const removeButton = this.page.locator(`//div[contains(@class, 'inventory_item_description')]//div[contains(text(), '${productName}')]//..//..//..//button[text()='Remove']`);
      await removeButton.click();
      console.log(`Removed "${productName}" from cart.`);
    } catch (error) {
      console.error(`Failed to remove "${productName}" from cart:`, error);
      throw error;
    }
  }

  async navigateToCart() {
    try {
      await this.shoppingCartLink.click();
      console.log('Navigated to cart.');
    } catch (error) {
      console.error('Failed to navigate to cart:', error);
      throw error;
    }
  }

  async navigateInventoryPage() {
    await this.page.goto('/inventory.html'); // navigate to inventory page
    console.log('Navigated to inventory page.');
  }
}