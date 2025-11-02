/// <reference types="cypress" />

import userData from "../fixtures/user-data.json";
import header from "../modules/header";
import login from "../modules/login";
import signup from "../modules/signup";
import accountDeleted from "../modules/account_deleted";
import contactUs from "../modules/contact_us";
import testCases from "../modules/test_cases";
import products from "../modules/products";
import footer from "../modules/footer";
import checkout from "../modules/checkout";
import categories from "../modules/categories";
import { getRandomEmail } from "../support/helpers";
import { faker } from "@faker-js/faker";

describe("Automation Exercise - Modularizarion", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Test Case 1: Register User", () => {
    let email = getRandomEmail();
    header.goToLogin();

    login.checkLoginTitles();
    login.startSignup(userData.name, email);

    signup.checkSignUpTitle();
    signup.fillAccountInformation(
      userData.password,
      faker.person.firstName(),
      faker.person.lastName()
    );

    cy.url().should("include", "/account_created");
    signup.checkAccountCreated();
    signup.clickContinueButton();
    header.checkLoggedInText(userData.name);
    header.deleteAccount();
    accountDeleted.checkAccountDeletedTitle();
  });

  it("Test Case 2: Login User with correct email and password", () => {
    header.goToLogin();

    login.checkLoginTitles();
    login.login(userData.email, userData.password);
    header.checkLoggedInText(userData.name);
  });

  it("Test Case 3: Login User with incorrect email and password", () => {
    header.goToLogin();

    login.login(faker.internet.email(), faker.internet.password());
    login.checkLoginErrorMessage();
  });

  it("Test Case 4: Logout User", () => {
    header.goToLogin();

    login.checkLoginTitles();
    login.login(userData.email, userData.password);
    header.checkLoggedInText(userData.name);
    header.logout();
    cy.url().should("include", "/login");
  });

  it("Test Case 5: Register User with existing email", () => {
    header.goToLogin();

    login.checkLoginTitles();
    login.startSignup(userData.name, userData.email);
    login.checkSignupErrorMessage();
  });

  it("Test Case 6: Contact Us Form", () => {
    header.goToContactUs();

    cy.url().should("include", "/contact_us");
    contactUs.checkContactUsTitle();
    contactUs.fillContactUsForm(
      userData.name,
      userData.email,
      userData.subject,
      userData.message
    );
    contactUs.checkSuccessMessage();
    header.goToHome();
    cy.url().should("include", "/");
  });

  it("Test Case 7: Test Cases", () => {
    header.goToTestCases();

    cy.url().should("include", "/test_cases");
    testCases.checkTestCasesTitle();
  });

  it("Test Case 8: Verify All Products and product detail page", () => {
    header.goToProducts();

    cy.url().should("include", "/products");
    products.checkAllProductsTitle();
    products.checkProductList();
    products.goToProductDetail(0);
    products.checkProductInformation();
  });

  it("Test Case 9: Search Product", () => {
    header.goToProducts();

    cy.url().should("include", "/products");
    products.checkAllProductsTitle();
    products.checkProductList();
    products.searchProduct("Blue Cotton Indie Mickey Dress");
    products.checkSearchedProducts();
  });

  it("Test Case 10: Verify Subscription in home page", () => {
    footer.goToSubscriptionForm();
    footer.submitSubscription(faker.internet.email());
  });

  it("Test Case 11: Verify Subscription in Cart page", () => {
    header.goToCart();

    cy.url().should("include", "/view_cart");
    footer.goToSubscriptionForm();
    footer.submitSubscription(faker.internet.email());
  });

  it("Test Case 12: Add Products in Cart", () => {
    header.goToProducts();

    cy.url().should("include", "/products");
    products.addProductToCartFromList(0);
    products.closeCartModal();
    products.addProductToCartFromList(1);
    products.goToCart();
    cy.url().should("include", "/view_cart");
    checkout.checkBagItems(2);
    checkout.checkProductInformation(0);
    checkout.checkProductInformation(1);
  });

  it("Test Case 13: Verify Product quantity in Cart", () => {
    products.goToProductDetail(0);
    products.checkProductInformation();
    products.updateQuantity(4);
    products.addProductToCartFromDetails();
    products.goToCart();
    checkout.checkBagItems(1);
    checkout.checkProductInformation(0, 4);
  });

  it("Test Case 14: Place Order: Register while Checkout", () => {
    let email = getRandomEmail();

    products.addProductToCartFromList(0);
    products.closeCartModal();
    products.addProductToCartFromList(1);
    header.goToCart();
    checkout.checkBagItems(2);
    checkout.goToCheckout();
    checkout.goToLogin();

    login.startSignup(userData.name, email);
    signup.fillAccountInformation(
      userData.password,
      faker.person.firstName(),
      faker.person.lastName()
    );

    cy.url().should("include", "/account_created");
    signup.checkAccountCreated();
    checkout.continueToCheckout();
    header.checkLoggedInText(userData.name);
    header.goToCart();
    checkout.goToCheckout();
    checkout.confirmDataAndPlaceOrder(userData.name, 2, userData.message);
    cy.url().should("include", "/payment_done");
    header.deleteAccount();
    accountDeleted.checkAccountDeletedTitle();
  });

  it("Test Case 15: Place Order: Register before Checkout", () => {
    let email = getRandomEmail();
    header.goToLogin();

    login.checkLoginTitles();
    login.startSignup(userData.name, email);

    signup.checkSignUpTitle();
    signup.fillAccountInformation(
      userData.password,
      faker.person.firstName(),
      faker.person.lastName()
    );

    cy.url().should("include", "/account_created");
    signup.checkAccountCreated();
    signup.clickContinueButton();
    header.checkLoggedInText(userData.name);

    products.addProductToCartFromList(0);
    products.closeCartModal();
    products.addProductToCartFromList(1);
    header.goToCart();
    checkout.checkBagItems(2);
    checkout.goToCheckout();

    checkout.confirmDataAndPlaceOrder(userData.name, 2, userData.message);
    cy.url().should("include", "/payment_done");
    header.deleteAccount();
    accountDeleted.checkAccountDeletedTitle();
  });

  it("Test Case 16: Place Order: Login before Checkout", () => {
    header.goToLogin();

    login.checkLoginTitles();
    login.login(userData.email, userData.password);
    header.checkLoggedInText(userData.name);

    products.addProductToCartFromList(0);
    products.closeCartModal();
    products.addProductToCartFromList(1);
    header.goToCart();
    checkout.checkBagItems(2);
    checkout.goToCheckout();

    checkout.confirmDataAndPlaceOrder(userData.name, 2, userData.message);
    cy.url().should("include", "/payment_done");
  });

  it("Test Case 17: Remove Products From Cart", () => {
    products.addProductToCartFromList(0);
    products.closeCartModal();
    products.addProductToCartFromList(1);
    products.goToCart();
    checkout.removeProduct(0);
    checkout.removeProduct(1);
    checkout.checkEmptyCart();
  });

  it("Test Case 18: View Category Products", () => {
    categories.checkCategoriesVisibility();

    categories.clickOnWomenCategory();
    categories.clickOnFirstSubcategory("Women");
    categories.checkCategoryTitle("Women - Dress Products");

    categories.clickOnMenCategory();
    categories.clickOnFirstSubcategory("Men");
    categories.checkCategoryTitle("Men - Tshirts Products");
  });

  it("Test Case 19: View & Cart Brand Products", () => {
    header.goToProducts();

    products.checkBrandsVisibility();
    products.clickOnBrand("Polo");
    cy.url().should("include", "/brand_products/Polo");
    products.checkProductList();

    products.clickOnBrand("H&M");
    cy.url().should("include", "/brand_products/H&M");
    products.checkProductList();
  });

  it("Test Case 20: Search Products and Verify Cart After Login", () => {
    header.goToProducts();

    products.searchProduct("Blue Top");
    products.checkSearchedProducts();
    products.addProductToCartFromList(0);
    products.goToCart();
    checkout.checkBagItems(1);

    header.goToLogin();
    login.login(userData.email, userData.password);

    header.goToCart();
    checkout.checkBagItems(1);
  });

  it("Test Case 21: Add review on product", () => {
    header.goToProducts();

    products.goToProductDetail(0);
    products.checkReviewFormVisibility();
    products.submitReview(
      userData.name,
      userData.email,
      userData.product_review
    );
    products.checkReviewSuccessMessage();
  });

  it("Test Case 22: Add to cart from Recommended items", () => {
    products.checkRecommendedItemsVisibility();
    products.addRecommendedItemToCart(0);
    products.goToCart();
    checkout.checkBagItems(1);
  });

  it("Test Case 23: Verify address details in checkout page", () => {
    let email = getRandomEmail();
    header.goToLogin();

    login.checkLoginTitles();
    login.startSignup(userData.name, email);

    signup.checkSignUpTitle();
    let account_information = signup.fillAccountInformation(
      userData.password,
      faker.person.firstName(),
      faker.person.lastName()
    );

    cy.url().should("include", "/account_created");
    signup.checkAccountCreated();
    signup.clickContinueButton();
    header.checkLoggedInText(userData.name);

    products.addProductToCartFromList(0);
    products.closeCartModal();
    products.addProductToCartFromList(1);
    products.goToCart();
    checkout.checkBagItems(2);
    checkout.goToCheckout();

    cy.get("#address_delivery").then(($delivery) => {
      const deliveryText = $delivery.text();

      expect(deliveryText).to.contain(account_information.address1);
      expect(deliveryText).to.contain(account_information.address1);
      expect(deliveryText).to.contain(account_information.address2);
      expect(deliveryText).to.contain(account_information.city);
      expect(deliveryText).to.contain(account_information.state);
      expect(deliveryText).to.contain(account_information.zipCode);
      expect(deliveryText).to.contain(account_information.country);
    });

    cy.get("#address_invoice").then(($billing) => {
      const billingText = $billing.text();

      expect(billingText).to.contain(account_information.address1);
      expect(billingText).to.contain(account_information.address2);
      expect(billingText).to.contain(account_information.city);
      expect(billingText).to.contain(account_information.state);
      expect(billingText).to.contain(account_information.zipCode);
      expect(billingText).to.contain(account_information.country);
    });

    header.deleteAccount();
    accountDeleted.checkAccountDeletedTitle();
  });

  it("Test Case 24: Download Invoice after purchase order", () => {
    let email = getRandomEmail();

    products.addProductToCartFromList(0);
    products.closeCartModal();
    header.goToCart();

    cy.url().should("include", "/view_cart");

    checkout.goToCheckout();
    checkout.goToLogin();

    login.startSignup(userData.name, email);
    signup.fillAccountInformation(
      userData.password,
      faker.person.firstName(),
      faker.person.lastName()
    );
    signup.clickContinueButton();

    header.goToCart();
    checkout.goToCheckout();
    checkout.confirmDataAndPlaceOrder(userData.name, 1, userData.message);

    cy.contains("Download Invoice").click();

    const downloadedFile = "cypress/downloads/invoice.txt";

    cy.readFile(downloadedFile).should(
      "contain",
      "Your total purchase amount is"
    );

    checkout.elements.continueCheckoutBtn().click();

    header.deleteAccount();
    accountDeleted.checkAccountDeletedTitle();
  });

  it("Test Case 25: Verify Scroll Up using 'Arrow' button and Scroll Down functionality", () => {
    footer.goToSubscriptionForm();
    footer.clickScrollUpButton();
  });

  it("Test Case 26: Verify Scroll Up without 'Arrow' button and Scroll Down functionality", () => {
    footer.goToSubscriptionForm();
    footer.scrollToTop();
  });
});
