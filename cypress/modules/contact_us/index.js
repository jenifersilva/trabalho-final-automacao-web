import titles from "../../fixtures/titles.json";
import messages from "../../fixtures/messages.json";

class ContactUs {
  elements = {
    nameInput: () => cy.get('input[data-qa="name"]'),
    emailInput: () => cy.get('input[data-qa="email"]'),
    subjectInput: () => cy.get('input[data-qa="subject"]'),
    messageInput: () => cy.get('textarea[data-qa="message"]'),
    uploadFile: () => cy.get('input[name="upload_file"]'),
    submitBtn: () => cy.get('input[data-qa="submit-button"]'),
    successText: () => cy.get(".status"),
  };

  checkContactUsTitle() {
    cy.contains(titles.get_in_touch);
  }

  fillContactUsForm(name, email, subject, message) {
    this.elements.nameInput().type(name);
    this.elements.emailInput().type(email);
    this.elements.subjectInput().type(subject);
    this.elements.messageInput().type(message);
    cy.fixture("cypress-logo.png").as("image");
    this.elements.uploadFile().selectFile("@image");
    this.elements.submitBtn().click();
  }

  checkSuccessMessage() {
    this.elements.successText().should("have.text", messages.message_sent);
  }
}
export default new ContactUs();
