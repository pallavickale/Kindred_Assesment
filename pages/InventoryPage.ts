import { Page, Locator,expect } from '@playwright/test';

export class InventoryPage {
    private page: Page;
    private addToCartButton;
    private shoppingCartLink;
    //private inventoryItems;
    //private productPrice;
    
    constructor(page) {
    this.page = page;
    ////div[contains(@class, 'inventory_item_description')]//*[@id="add-to-cart-sauce-labs-backpack"]
    //this.addToCartButton = (productName) => this.page.locator(`//div[contains(@class, 'inventory_item_description')]//*[@id="add-to-cart-${productName}"]`);
    this.addToCartButton = (productName) => this.page.locator(`//div[contains(@class, 'inventory_item_description')]//div[contains(text(), '${productName}')]//..//..//..//button`);
    
    this.shoppingCartLink = this.page.locator('#shopping_cart_container'); // Or a more robust locator
    //this.inventoryItems = this.page.locator('.inventory_item'); // Locator for all inventory items
    //this.productPrice = (productName) => this.page.locator(`//div[contains(@class, 'inventory_item_description')]//div[contains(text(), '${productName}')]/following-sibling::div[@class='inventory_item_price']`);

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

//   async verifyProductDisplayed(productName) {
//     try {
//       const productLocator = this.page.locator(`//div[contains(@class, 'inventory_item_description')]//div[contains(text(), '${productName}')]`);
//       await expect(productLocator).toBeVisible();
//       console.log(`Verified that "${productName}" is displayed on the inventory page.`);
//     } catch (error) {
//       console.error(`Failed to verify that "${productName}" is displayed:`, error);
//       throw error;
//     }
//   }

//   async getProductPrice(productName) {
//     try {
//         const priceLocator = this.productPrice(productName);
//         const priceText = await priceLocator.textContent();
//         const price = parseFloat(priceText.replace('$', '')); // Remove $ and convert to number
//         console.log(`Price of ${productName} is ${price}`);
//         return price;
//     } catch (error) {
//         console.error(`Failed to get price of ${productName}:`, error);
//         throw error;
//     }
// }


//   async getAllInventoryItems() {
//     try {
//       const items = await this.inventoryItems.all();
//       console.log(`Found ${items.length} inventory items.`);
//       return items;
//     } catch (error) {
//       console.error('Failed to get all inventory items:', error);
//       throw error;
//     }
//   }

//   async verifyNumberOfItemsInInventory(expectedCount) {
//     try {
//       const items = await this.getAllInventoryItems();
//       expect(items.length).toBe(expectedCount);
//       console.log(`Verified that there are ${expectedCount} items in inventory.`);
//     } catch (error) {
//       console.error(`Failed to verify the number of items in inventory:`, error);
//       throw error;
//     }
//   }

  async navigateInventoryPage() {
    try {
      await this.page.goto('/inventory.html'); // Or your relative path
      console.log('Navigated to inventory page.');
    } catch (error) {
      console.error('Failed to navigate to inventory page:', error);
      throw error;
    }
  }
}