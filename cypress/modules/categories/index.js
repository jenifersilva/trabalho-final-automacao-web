class Categories {
  elements = {
    categoriesArea: () => cy.get(".category-products"),
    womenCategory: () => cy.get("a[href='#Women']"),
    menCategory: () => cy.get("a[href='#Men']"),
    categoryTitle: () => cy.get(".features_items h2.title"),
  };

  checkCategoriesVisibility() {
    this.elements.categoriesArea().should("be.visible");
  }

  clickOnWomenCategory() {
    this.elements.womenCategory().click();
  }

  clickOnMenCategory() {
    this.elements.menCategory().click();
  }

  clickOnFirstSubcategory(category) {
    cy.get(`#${category} > .panel-body > ul > :nth-child(1) > a`).click();
  }

  checkCategoryTitle(title) {
    this.elements.categoryTitle().should("have.text", title);
  }
}

export default new Categories();
