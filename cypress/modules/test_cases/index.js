import titles from "../../fixtures/titles.json";

class TestCases {
  elements = {
    testCasesHeader: () => cy.get(".title > b"),
  };

  checkTestCasesTitle() {
    this.elements.testCasesHeader().should("have.text", titles.test_cases);
  }
}
export default new TestCases();
