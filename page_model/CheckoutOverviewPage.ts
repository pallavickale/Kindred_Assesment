import { Page, Locator } from '@playwright/test';

export class CheckoutOverviewPage {
  private page: Page;
  private finishButton :Locator;

  constructor(page: Page) {

    this.page = page;
    this.finishButton = this.page.locator('#finish');
  }

  async finishCheckout() {
    try {
      await this.finishButton.click();
      console.log('Finished checkout.');
    } catch (error) {
      console.error('Failed to finish checkout:', error);
      throw error;
    }
  }
}
