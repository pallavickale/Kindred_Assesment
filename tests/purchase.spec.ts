import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';

test('End-to-End Purchase Scenario @purchase', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  const checkoutOverviewPage = new CheckoutOverviewPage(page);
  const checkoutCompletePage = new CheckoutCompletePage(page);

  //login to website 
  await loginPage.navigate();
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(page).toHaveURL(/inventory\.html/); //validate if the user landed on inventory page
  
  //add 2 products in cart
  const product1 = 'Sauce Labs Backpack';
  const product2 = 'Sauce Labs Bike Light';

  await inventoryPage.addProductToCart(product1); 
  await inventoryPage.addProductToCart(product2); 

//   await inventoryPage.addProductToCart('sauce-labs-backpack'); 
//   await inventoryPage.addProductToCart('sauce-labs-bike-light'); 

  //navigate to cart page
  await inventoryPage.navigateToCart();
  await expect(page).toHaveURL(/cart\.html/);

  //proceed to checkout
  await cartPage.proceedToCheckout();
  await expect(page).toHaveURL(/checkout-step-one\.html/);

  //fill user information
  await checkoutPage.fillCheckoutInformation('Pallavi', 'Kale', '2557'); 

  //
  await checkoutPage.continueToOverview();
  await expect(page).toHaveURL(/checkout-step-two\.html/);

  //add validations here

  //proceed to purchase 
  await checkoutOverviewPage.finishCheckout();
  await expect(page).toHaveURL(/checkout-complete\.html/);

  //rder completion
  const successMessage = await checkoutCompletePage.getSuccessMessage();
  expect(successMessage).toContain('Thank you for your order!');

});

test('Remove item from cart and verify on cart page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
  
    // 1. Login
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory\.html/);
  
    // 2. Add two products to cart
    const product1 = 'Sauce Labs Backpack';
    const product2 = 'Sauce Labs Bike Light';
    await inventoryPage.addProductToCart(product1);
    await inventoryPage.addProductToCart(product2);
  
    // 3. Go to cart page
    await inventoryPage.navigateToCart();
    await expect(page).toHaveURL(/cart\.html/);
    await cartPage.verifyCartItems([product1, product2]); // Verify both items are in cart
  
    // 4. Go back to inventory page
    await page.goBack(); 
    await expect(page).toHaveURL(/inventory\.html/);
  
    // 5. Remove one product from inventory page
    await inventoryPage.removeProductFromCart(product1); 
  
    // 6. Go to cart page again
    await inventoryPage.navigateToCart();
    await expect(page).toHaveURL(/cart\.html/);
  
    // 7. Verify that the removed product is not in the cart
    await cartPage.verifyCartItems([product2]); 
  
  });