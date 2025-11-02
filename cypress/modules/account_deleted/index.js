import titles from "../../fixtures/titles.json";

class AccountDeleted {
  elements = {
    accountDeletedHeader: () => cy.get("h2[data-qa=account-deleted]"),
    continueBtn: () => cy.get('[data-qa="continue-button"]'),
  };

  checkAccountDeletedTitle() {
    this.elements
      .accountDeletedHeader()
      .should("have.text", titles.account_deleted);
  }
}
export default new AccountDeleted();
