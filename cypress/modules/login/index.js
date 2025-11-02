import titles from "../../fixtures/titles.json";
import messages from "../../fixtures/messages.json";

class Login {
  elements = {
    // Signup Form
    signupNameInput: () => cy.get('input[data-qa="signup-name"]'),
    signupEmailInput: () => cy.get('input[data-qa="signup-email"]'),
    signupButton: () => cy.get('button[data-qa="signup-button"]'),
    signupErrorText: () => cy.get(".signup-form > form > p"),

    // Login Form
    loginEmailInput: () => cy.get('[data-qa="login-email"]'),
    loginPasswordInput: () => cy.get('[data-qa="login-password"]'),
    loginButton: () => cy.get('button[data-qa="login-button"]'),
    loginErrorText: () => cy.get(".login-form > form > p"),
  };

  checkLoginTitles() {
    cy.contains(titles.login);
    cy.contains(titles.signup);
  }

  startSignup(name, email) {
    this.elements.signupNameInput().type(name);
    this.elements.signupEmailInput().type(email);
    this.elements.signupButton().click();
  }

  login(email, password) {
    this.elements.loginEmailInput().type(email);
    this.elements.loginPasswordInput().type(password);
    this.elements.loginButton().click();
  }

  checkLoginErrorMessage() {
    this.elements
      .loginErrorText()
      .should("have.text", messages.incorrect_email_password);
  }

  checkSignupErrorMessage() {
    this.elements
      .signupErrorText()
      .should("have.text", messages.email_already_exists);
  }
}

export default new Login();
