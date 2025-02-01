import { test, expect } from '@playwright/test';
import { LoginPage } from '../page_model/LoginPage';
import { InventoryPage } from '../page_model/InventoryPage';
import { CartPage } from '../page_model/CartPage';
import { CheckoutPage } from '../page_model/CheckoutPage';
import { CheckoutOverviewPage } from '../page_model/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../page_model/CheckoutCompletePage';
import { STANDARD_USER, STANDARD_PASSWORD, PRODUCT1, PRODUCT2, USERLASTNAME, USERNAME, PINCODE } from '../constants/constants'; 

test('Complete Purchase Scenario @purchaseitem', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  const checkoutOverviewPage = new CheckoutOverviewPage(page);
  const checkoutCompletePage = new CheckoutCompletePage(page);

  //login to website 
  await loginPage.navigate();
  await loginPage.login(STANDARD_USER, STANDARD_PASSWORD);
  await expect(page).toHaveURL(/inventory\.html/); //validate if the user landed on inventory page
  
  //add 2 products in cart
  await inventoryPage.addProductToCart(PRODUCT1); 
  await inventoryPage.addProductToCart(PRODUCT2); 

//   await inventoryPage.addProductToCart('sauce-labs-backpack'); 
//   await inventoryPage.addProductToCart('sauce-labs-bike-light'); 

  //navigate to cart page
  await inventoryPage.navigateToCart();
  await expect(page).toHaveURL(/cart\.html/);

  //proceed to checkout
  await cartPage.proceedToCheckout();
  await expect(page).toHaveURL(/checkout-step-one\.html/);

  //fill user information
  await checkoutPage.fillCheckoutInformation(USERNAME, USERLASTNAME, PINCODE); 

  //
  await checkoutPage.continueToOverview();
  await expect(page).toHaveURL(/checkout-step-two\.html/);

  //add validations here

  //proceed to purchase 
  await checkoutOverviewPage.finishCheckout();
  await expect(page).toHaveURL(/checkout-complete\.html/);

  //rder completion
  const successMessage = await checkoutCompletePage.getSuccessMessage();
  expect(successMessage).toContain('Thank you for your order!'); //verify success message

});

test('Remove item from cart and verify on cart page @removeitemfromcart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
  
    //login to website 
    await loginPage.navigate();
    await loginPage.login(STANDARD_USER, STANDARD_PASSWORD);
    await expect(page).toHaveURL(/inventory\.html/);
  
    //add 2 products in cart
    await inventoryPage.addProductToCart(PRODUCT1);
    await inventoryPage.addProductToCart(PRODUCT2);
  
    //navigate to cart page
    await inventoryPage.navigateToCart();
    await expect(page).toHaveURL(/cart\.html/);
    await cartPage.verifyCartItems([PRODUCT1, PRODUCT2]); // Verify both items are in cart
  
    //navigate back to inventory page
    await page.goBack(); 
    await expect(page).toHaveURL(/inventory\.html/);
  
    //remove 1 product from cart
    await inventoryPage.removeProductFromCart(PRODUCT1); 
  
    //navigate to cart page
    await inventoryPage.navigateToCart();
    await expect(page).toHaveURL(/cart\.html/);
  
    //check removed product is not in the cart
    await cartPage.verifyCartItems([PRODUCT2]); 
  
  });