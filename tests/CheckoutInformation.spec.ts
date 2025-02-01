import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test('Checkout Information First Name Validation', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    //login to website 
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory\.html/); //validate if the user landed on inventory page
    
    //add 2 products in cart
    await inventoryPage.addProductToCart('sauce-labs-backpack'); 
    await inventoryPage.addProductToCart('sauce-labs-bike-light'); 

    //navigate to cart page
    await inventoryPage.navigateToCart();
    await expect(page).toHaveURL(/cart\.html/);

    //proceed to checkout
    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL(/checkout-step-one\.html/);

    //fill user information
    await checkoutPage.validateCheckoutInformation('', 'Kale', '2557'); //empty string for first name

})

test('Checkout Information Last Name Validation', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    //login to website 
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory\.html/); //validate if the user landed on inventory page
    
    //add 2 products in cart
    await inventoryPage.addProductToCart('sauce-labs-backpack'); 
    await inventoryPage.addProductToCart('sauce-labs-bike-light'); 

    //navigate to cart page
    await inventoryPage.navigateToCart();
    await expect(page).toHaveURL(/cart\.html/);

    //proceed to checkout
    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL(/checkout-step-one\.html/);

    //fill user information
    await checkoutPage.validateCheckoutInformation('Pallavi', '', '2557'); //empty string for last name

})

test('Checkout Information postal code Validation', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    //login to website 
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory\.html/); //validate if the user landed on inventory page
    
    //add 2 products in cart
    await inventoryPage.addProductToCart('sauce-labs-backpack'); 
    await inventoryPage.addProductToCart('sauce-labs-bike-light'); 

    //navigate to cart page
    await inventoryPage.navigateToCart();
    await expect(page).toHaveURL(/cart\.html/);

    //proceed to checkout
    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL(/checkout-step-one\.html/);

    //fill user information
    await checkoutPage.validateCheckoutInformation('Pallavi', 'Kale', ''); //empty string for postal code

})