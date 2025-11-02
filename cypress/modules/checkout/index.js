import titles from "../../fixtures/titles.json";
import messages from "../../fixtures/titles.json";
import { faker } from "@faker-js/faker";

class Checkout {
  elements = {
    emptyCart: () => cy.get("#cart_info_table"),
    bagItems: () => cy.get("tbody > tr"),
    productDescription: () => cy.get(".cart_description > h4"),
    productCategory: () => cy.get(".cart_description > p"),
    productPrice: () => cy.get(".cart_price > p"),
    productQuantity: () => cy.get(".cart_quantity > button"),
    productTotal: () => cy.get("p.cart_total_price"),
    productDeleteBtn: () => cy.get("a.cart_quantity_delete"),
    proceedToCheckoutBtn: () => cy.get(".check_out"),
    loginBtn: () => cy.get("p > a[href='/login']"),
    continueCheckoutBtn: () => cy.get("a[data-qa='continue-button']"),
    deliveryInfoArea: () => cy.get("#address_delivery"),
    billingInfoArea: () => cy.get("#address_invoice"),
    messageInput: () => cy.get("textarea[name='message']"),
    placeOrderBtn: () => cy.get("a[href='/payment']"),
    nameOnCardBtn: () => cy.get("input[data-qa='name-on-card']"),
    cardNumberBtn: () => cy.get("input[data-qa='card-number']"),
    cvcInput: () => cy.get("input[data-qa='cvc']"),
    expiryMonthInput: () => cy.get("input[data-qa='expiry-month']"),
    expiryYearInput: () => cy.get("input[data-qa='expiry-year']"),
    payAndConfirmBtn: () => cy.get("button[data-qa='pay-button']"),
    orderPlacedTitle: () => cy.get("h2[data-qa='order-placed'] > b"),
  };

  checkBagItems(expectedQuantity) {
    this.elements.bagItems().should("have.length", expectedQuantity);
  }

  checkEmptyCart() {
    this.elements.emptyCart().should("be.visible");
  }

  checkProductInformation(index, quantity = 1) {
    this.elements.productDescription().eq(index).should("not.be.empty");
    this.elements.productCategory().eq(index).should("not.be.empty");
    this.elements.productPrice().eq(index).should("not.be.empty");
    this.elements.productQuantity().eq(index).should("have.text", quantity);
    this.elements.productTotal().eq(index).should("not.be.empty");
    this.elements.productDeleteBtn().eq(index).should("be.visible");
  }

  goToCheckout() {
    this.elements.proceedToCheckoutBtn().click();
  }

  goToLogin() {
    this.elements.loginBtn().click();
  }

  continueToCheckout() {
    this.elements.continueCheckoutBtn().click();
  }

  checkCheckoutItems(expectedProductItems) {
    this.elements.bagItems().should("have.length", expectedProductItems + 1);
  }

  confirmDataAndPlaceOrder(name, productItems, message) {
    this.elements.deliveryInfoArea().should("be.visible");
    this.elements.billingInfoArea().should("be.visible");
    this.checkCheckoutItems(productItems);
    this.elements.messageInput().type(message);
    this.elements.placeOrderBtn().click();
    this.elements.nameOnCardBtn().type(name);
    this.elements.cardNumberBtn().type(faker.finance.creditCardNumber());
    this.elements.cvcInput().type(faker.finance.creditCardCVV());
    this.elements.expiryMonthInput().type(faker.date.month());
    this.elements.expiryYearInput().type(faker.date.past().getFullYear());
    this.elements.payAndConfirmBtn().click();
    cy.contains(messages.order_placed).should("be.visible");
    this.elements.orderPlacedTitle().should("have.text", titles.order_placed);
  }

  removeProduct(index) {
    this.elements.productDeleteBtn().eq(index).click();
  }
}

export default new Checkout();
