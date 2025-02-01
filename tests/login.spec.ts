import { test, expect } from '@playwright/test';
import { LoginPage } from '../page_model/LoginPage'; // import LoginPage POM
import { InventoryPage } from '../page_model/InventoryPage'; //import InventoryPage POM
import { STANDARD_USER, STANDARD_PASSWORD, INVALID_USER, INVALID_PASSWORD } from '../constants/constants'; 

test('Successful Login @login', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigate(); // Navigate to the login page
  await loginPage.login(STANDARD_USER, STANDARD_PASSWORD);
  await expect(page).toHaveURL(/inventory\.html/); // Check user is landed in invetory page
  await expect(page.locator('.app_logo')).toBeVisible(); 
});

test('Failed Login - Invalid Username @login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login(INVALID_USER, STANDARD_PASSWORD); // incorrect username
  await expect(page.locator('[data-test="error"]')).toBeVisible();
  await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Username and password do not match any user in this service'); // Verify the error message
});
  
test('Failed Login - Invalid Password @login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  await loginPage.navigate();
  await loginPage.login(STANDARD_USER, INVALID_PASSWORD); //incorrect password
  await expect(page.locator('[data-test="error"]')).toBeVisible();
  await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Username and password do not match any user in this service'); // Verify the error message
});
  
test('Failed Login - Empty Username @login', async ({ page }) => {
  const loginPage = new LoginPage(page);
    
  await loginPage.navigate();
  await loginPage.login('', STANDARD_PASSWORD); // blank username
  await expect(page.locator('[data-test="error"]')).toBeVisible();
  await expect(page.locator('[data-test="error"]')).toContainText('Username is required'); // Verify the error message
});
    
test('Failed Login - Empty Password @login', async ({ page }) => {
  const loginPage = new LoginPage(page);
    
  await loginPage.navigate();
  await loginPage.login(STANDARD_USER, ''); // blank password
  await expect(page.locator('[data-test="error"]')).toBeVisible();
  await expect(page.locator('[data-test="error"]')).toContainText('Password is required'); // Verify the error message
});

test('Access Inventory Page without login', async({page}) =>{
  const inventoryPage =new InventoryPage(page);

  await inventoryPage.navigateInventoryPage(); //jump to inventory page without login
  await expect(page.locator('[data-test="error"]')).toBeVisible();
  await expect(page.locator('[data-test="error"]')).toContainText("You can only access '\/inventory\.html' when you are logged in."); // Verify the error message
});