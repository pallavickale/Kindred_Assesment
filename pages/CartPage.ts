import { Page, Locator, expect } from '@playwright/test';

export class CartPage {

    private page: Page;
    private checkoutButton :Locator;
    private cartItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = this.page.locator('#checkout'); 
    this.cartItems = this.page.locator('.cart_item'); 
    // this.cartTotalLabel = this.page.locator('.summary_subtotal_label');
    // this.cartTotalValue = this.page.locator('.summary_subtotal_label + .summary_subtotal');
    // this.taxLabel = this.page.locator('.summary_tax_label');
    // this.taxValue = this.page.locator('.summary_tax_label + .summary_tax');
    // this.totalLabel = this.page.locator('.summary_total_label');
    // this.totalValue = this.page.locator('.summary_total_label + .summary_total');
    // this.removeItemButton = (itemName) => this.page.locator(`//div[text()='${itemName}']/ancestor::div[@class='cart_item']//button`); // Locate remove button within the item's container

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

  async verifyCartItems(expectedItems) {
    try {
      const actualItems = await this.cartItems.all();
      expect(actualItems.length).toBe(expectedItems.length);

      for (const expectedItem of expectedItems) {
        const itemLocator = this.page.locator(`//div[text()='${expectedItem}']`); 
        await expect(itemLocator).toBeVisible();
      }
      console.log(`Verified that all expected items are in the cart.`);
    } catch (error) {
      console.error('Failed to verify cart items:', error);
      throw error;
    }
  }

//   async getCartTotal() {
//     try {
//       const totalText = await this.cartTotalValue.textContent();
//       const total = parseFloat(totalText.replace('$', '')); 
//       return total;
//     } catch (error) {
//       console.error('Failed to get cart total:', error);
//       throw error;
//     }
//   }

//   async getTax() {
//     try {
//       const taxText = await this.taxValue.textContent();
//       const tax = parseFloat(taxText.replace('$', '')); 
//       return tax;
//     } catch (error) {
//       console.error('Failed to get tax:', error);
//       throw error;
//     }
//   }

//   async getTotal() {
//     try {
//       const totalText = await this.totalValue.textContent();
//       const total = parseFloat(totalText.replace('$', '')); 
//       return total;
//     } catch (error) {
//       console.error('Failed to get total:', error);
//       throw error;
//     }
//   }

//   async removeItemFromCart(itemName) {
//     try {
//       const removeButton = this.removeItemButton(itemName);
//       await removeButton.click();
//       console.log(`Removed "${itemName}" from cart.`);
//     } catch (error) {
//       console.error(`Failed to remove "${itemName}" from cart:`, error);
//       throw error;
//     }
//   }
}