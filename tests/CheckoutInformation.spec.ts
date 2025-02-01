import { test, expect } from '@playwright/test';
import { LoginPage } from '../page_model/LoginPage';
import { InventoryPage } from '../page_model/InventoryPage';
import { CartPage } from '../page_model/CartPage';
import { CheckoutPage } from '../page_model/CheckoutPage';
import { STANDARD_USER, STANDARD_PASSWORD, PRODUCT1, PRODUCT2, USERLASTNAME, USERNAME, PINCODE } from '../constants/constants'; 

test('Checkout Information First Name Validation', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    //login to website 
    await loginPage.navigate();
    await loginPage.login(STANDARD_USER, STANDARD_PASSWORD);
    await expect(page).toHaveURL(/inventory\.html/); //validate if the user landed on inventory page
    
    //add 2 products in cart
    await inventoryPage.addProductToCart(PRODUCT1); 
    await inventoryPage.addProductToCart(PRODUCT2); 

    //navigate to cart page
    await inventoryPage.navigateToCart();
    await expect(page).toHaveURL(/cart\.html/);

    //proceed to checkout
    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL(/checkout-step-one\.html/);

    //fill user information
    await checkoutPage.validateCheckoutInformation('', USERLASTNAME, PINCODE); //empty string for first name

})

test('Checkout Information Last Name Validation', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    //login to website 
    await loginPage.navigate();
    await loginPage.login(STANDARD_USER, STANDARD_PASSWORD);
    await expect(page).toHaveURL(/inventory\.html/); //validate if the user landed on inventory page
    
    //add 2 products in cart
    await inventoryPage.addProductToCart(PRODUCT1); 
    await inventoryPage.addProductToCart(PRODUCT2);  

    //navigate to cart page
    await inventoryPage.navigateToCart();
    await expect(page).toHaveURL(/cart\.html/);

    //proceed to checkout
    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL(/checkout-step-one\.html/);

    //fill user information
    await checkoutPage.validateCheckoutInformation(USERNAME, '', PINCODE); //empty string for last name

})

test('Checkout Information postal code Validation', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    //login to website 
    await loginPage.navigate();
    await loginPage.login(STANDARD_USER, STANDARD_PASSWORD);
    await expect(page).toHaveURL(/inventory\.html/); //validate if the user landed on inventory page
    
    //add 2 products in cart
    await inventoryPage.addProductToCart(PRODUCT1); 
    await inventoryPage.addProductToCart(PRODUCT2); 

    //navigate to cart page
    await inventoryPage.navigateToCart();
    await expect(page).toHaveURL(/cart\.html/);

    //proceed to checkout
    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL(/checkout-step-one\.html/);

    //fill user information
    await checkoutPage.validateCheckoutInformation(USERNAME, USERLASTNAME, ''); //empty string for postal code

})