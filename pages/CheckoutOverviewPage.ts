import { Page, Locator } from '@playwright/test';

export class CheckoutOverviewPage {

    private page: Page;
    private finishButton :Locator;
    private itemRows : Locator;
    private itemTotalLabel : Locator;
    private itemTotalValue: Locator;
    private taxLabel :Locator;
    private taxValue : Locator;
    private totalLabel : Locator;
    private totalValue: Locator;


  constructor(page: Page) {

    this.page = page;
    this.finishButton = this.page.locator('#finish');
    this.itemRows = this.page.locator('.cart_item');
    this.itemTotalLabel = this.page.locator('.summary_subtotal_label');
    this.itemTotalValue = this.page.locator('.summary_subtotal_label + .summary_subtotal');
    this.taxLabel = this.page.locator('.summary_tax_label');
    this.taxValue = this.page.locator('.summary_tax_label + .summary_tax');
    this.totalLabel = this.page.locator('.summary_total_label');
    this.totalValue = this.page.locator('.summary_total_label + .summary_total');
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

  // async getItemTotal() {
  //   try {
  //     const itemTotalText = await this.itemTotalValue.textContent();
  //     const itemTotal = parseFloat(itemTotalText.replace('$', ''));
  //     return itemTotal;
  //   } catch (error) {
  //     console.error('Failed to get item total:', error);
  //     throw error;
  //   }
  // }

  // async getTax() {
  //   try {
  //     const taxText = await this.taxValue.textContent();
  //     const tax = parseFloat(taxText.replace('$', ''));
  //     return tax;
  //   } catch (error) {
  //     console.error('Failed to get tax:', error);
  //     throw error;
  //   }
  // }

  // async getTotal() {
  //   try {
  //     const totalText = await this.totalValue.textContent();
  //     const total = parseFloat(totalText.replace('$', ''));
  //     return total;
  //   } catch (error) {
  //     console.error('Failed to get total:', error);
  //     throw error;
  //   }
  // }

}
