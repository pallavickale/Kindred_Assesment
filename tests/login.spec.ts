import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage'; // import LoginPage POM

test('Successful Login @login', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigate(); // Navigate to the login page
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(page).toHaveURL(/inventory\.html/); // Check user is landed in invetory page
  await expect(page.locator('.app_logo')).toBeVisible(); 
});

test('Failed Login - Invalid Username @login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login('invalid_user', 'secret_sauce'); // incorrect username
  await expect(page.locator('[data-test="error"]')).toBeVisible();
  await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Username and password do not match any user in this service'); // Verify the error message
});
  
test('Failed Login - Invalid Password @login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  await loginPage.navigate();
  await loginPage.login('standard_user', 'invalid_password'); //incorrect password
  await expect(page.locator('[data-test="error"]')).toBeVisible();
  await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Username and password do not match any user in this service');
});
  
test('Failed Login - Empty Username @login', async ({ page }) => {
  const loginPage = new LoginPage(page);
    
  await loginPage.navigate();
  await loginPage.login('', 'secret_sauce'); // blank username
  await expect(page.locator('[data-test="error"]')).toBeVisible();
  await expect(page.locator('[data-test="error"]')).toContainText('Username is required');
});
    
test('Failed Login - Empty Password @login', async ({ page }) => {
  const loginPage = new LoginPage(page);
    
  await loginPage.navigate();
  await loginPage.login('standard_user', ''); // blank password
  await expect(page.locator('[data-test="error"]')).toBeVisible();
  await expect(page.locator('[data-test="error"]')).toContainText('Password is required');
});

test('Access Inventory Page without login', async({page}) =>{
  const loginPage =new LoginPage(page);

  await loginPage.navigateInventoryPage();
  await expect(page.locator('[data-test="error"]')).toBeVisible();
  await expect(page.locator('[data-test="error"]')).toContainText("You can only access '\/inventory\.html' when you are logged in.");
});