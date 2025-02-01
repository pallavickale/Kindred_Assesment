## E-commerce Website Swag Labs Test Scenarios
This document outlines the project architecture and test scenarios created for the e-commerce website Swag Labs. 

**Project Architecture**

* **Project Structure:**
    *   `tests/`: Contains all test files
    *   `page_model/`: Contains Page Object Models (POM) for each page of the application
    *   `constants/`: Contains constant variables used throughout the project
    *   `playwright.config.ts`: Contains the Playwright configuration settings.
    *   `package.json`: Manages project dependencies and scripts.

* **Page Object Model (POM):**
    *   Each page of the application is represented by a separate class
    *   POMs encapsulate page-specific locators, actions, and assertions.
    *   This promotes code reusability, maintainability, and better test organization.

* **Testing Framework:**
    *   Playwright is used as the primary testing framework.
    *   It provides cross-browser compatibility and supports various testing types (e.g., end-to-end, API testing).

* **Testing Approach:**
    *   Test scenarios are designed to cover various purchase journeys and login scenarios.
    *   Focus is on writing robust and maintainable tests with clear and concise assertions.


**Test Scenarios**
Below are Test scnearios covered in this project

**1. Login**

*   **1.1 Successful Login:** 
    *   Verify successful login with valid credentials.
    *   Assert that the user is redirected to the inventory page.
    *   Verify the expected elements are present on the inventory page.

*   **1.2 Invalid User Name:**
    *   Attempt login with an invalid username and valid password.
    *   Verify that the login fails and an appropriate error message is displayed.

*   **1.3 Invalid Password:**
    *   Attempt login with a valid username and an invalid password.
    *   Verify that the login fails and an appropriate error message is displayed.

*   **1.4 Empty User Name:**
    *   Attempt login with an empty username and a valid password.
    *   Verify that the login fails and an appropriate error message is displayed.

*   **1.5 Empty Password:**
    *   Attempt login with a valid username and an empty password.
    *   Verify that the login fails and an appropriate error message is displayed.

*   **1.6 Navigate to Inventory page without Login:**
    *   Attempt to directly navigate to the inventory page without logging in.
    *   Verify that the user is redirected to the login page or an appropriate message is displayed.

**2. Purchase**

*   **2.1 Complete Purchase:**
    *   Login successfully.
    *   Add multiple products to the cart.
    *   Proceed to checkout.
    *   Fill in valid checkout information.
    *   Complete the purchase.
    *   Verify successful order placement and order confirmation.

*   **2.2 Add and Remove Items from Cart:**
    *   Add multiple products to the cart.
    *   Remove one or more products from the cart.
    *   Go to the cart page and verify that the removed products are no longer present.

**3. Checkout Information**

*   **3.1 First Name Missing:**
    *   Attempt to proceed to the next step in the checkout process without entering the first name.
    *   Verify that the system displays an error message indicating that the first name is required.

*   **3.2 Last Name Missing:**
    *   Attempt to proceed to the next step in the checkout process without entering the last name.
    *   Verify that the system displays an error message indicating that the last name is required.

*   **3.3 Pin Code Missing:**
    *   Attempt to proceed to the next step in the checkout process without entering the postal code.
    *   Verify that the system displays an error message indicating that the postal code is required.
