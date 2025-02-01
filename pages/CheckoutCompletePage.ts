import { Page, Locator } from '@playwright/test';

export class CheckoutCompletePage {
  private page : Page;
  private header : Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = this.page.locator('.complete-header'); 
  }

  async getSuccessMessage() {
    
    const headerText = await this.header.textContent();
    return headerText; 
  }
}