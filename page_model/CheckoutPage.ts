import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {

  private page: Page;
  private firstName :Locator;
  private lastName : Locator;
  private pinCode : Locator;
  private continueBtn : Locator;
  private errorMessage : Locator;


  constructor(page: Page) {
    this.page = page;
    this.firstName = this.page.locator('#first-name');
    this.lastName = this.page.locator('#last-name');
    this.pinCode = this.page.locator('#postal-code');
    this.continueBtn = this.page.locator('#continue');
    this.errorMessage = this.page.locator('[data-test="error"]');
  }

  async fillCheckoutInformation(firstName, lastName, postalCode) {

    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.pinCode.fill(postalCode);
    console.log('Checkout information filled.');
  }

  async continueToOverview() {
    
    await this.continueBtn.click();
    console.log('Continued to checkout overview.');
  }

  async validateCheckoutInformation(firstName, lastName, postalCode) {
    try {
      // Fill in the checkout information
      await this.fillCheckoutInformation(firstName, lastName, postalCode);

      // Click Continue
      await this.continueBtn.click();

      // Check for error messages
      const errorMessage = await this.errorMessage.textContent();

      if (firstName === '') {
        expect(errorMessage).toContain('Error: First Name is required');
      } else if (lastName === '') {
        expect(errorMessage).toContain('Error: Last Name is required');
      } else if (postalCode === '') {
        expect(errorMessage).toContain('Error: Postal Code is required');
      } else if (isNaN(postalCode)) { 
        expect(errorMessage).toContain('Error: Postal Code should only contain numbers');
      } else {
        // If no error message is found, assume validation passed
        expect(errorMessage).toBeNull(); 
      }

    } catch (error) {
      console.error('Failed to validate checkout information:', error);
      throw error;
    }
  }
}