class Header {
  elements = {
    homeBtn: () => cy.get(".fa-home"),
    productsBtn: () => cy.get("a[href='/products']"),
    cartBtn: () => cy.get("a[href='/view_cart']").first(),
    loginBtn: () => cy.get('li > a[href="/login"]'),
    logoutBtn: () => cy.get("a[href='/logout']"),
    testCasesBtn: () => cy.get("a[href='/test_cases']"),
    deleteAccountBtn: () => cy.get('a[href="/delete_account"]'),
    contactUsBtn: () => cy.get("a[href='/contact_us']"),
    loggedInAsText: (username) => cy.contains(`Logged in as ${username}`),
  };

  goToHome() {
    this.elements.homeBtn().click();
  }

  goToProducts() {
    this.elements.productsBtn().click();
  }

  goToCart() {
    this.elements.cartBtn().click();
  }

  goToLogin() {
    this.elements.loginBtn().click();
  }

  logout() {
    this.elements.logoutBtn().click();
  }

  deleteAccount() {
    this.elements.deleteAccountBtn().click();
  }

  goToTestCases() {
    this.elements.testCasesBtn().first().click();
  }

  goToContactUs() {
    this.elements.contactUsBtn().click();
  }

  checkLoggedInText(username) {
    this.elements.loggedInAsText(username).should("be.visible");
  }
}

export default new Header();
