import titles from "../../fixtures/titles.json";

class Products {
  elements = {
    productsListTitle: () => cy.get(".title"),
    searchInput: () => cy.get("input[id='search_product']"),
    submitSearchBtn: () => cy.get("button[id='submit_search']"),
    productList: () => cy.get(".features_items"),
    productCard: () => cy.get(".single-products"),
    viewProductBtn: () => cy.get(".choose"),
    addToCartListBtn: () => cy.get(".productinfo > a.add-to-cart"),
    continueShoppingBtn: () => cy.get(".close-modal"),
    viewCartBtn: () => cy.get("a[href='/view_cart'] > u"),
    productDetailsArea: () => cy.get(".product-information"),
    productNameLbl: () => cy.get(".product-information > h2"),
    productCategoryLbl: () => cy.get(".product-information > p").first(),
    productPriceLbl: () => cy.get(".product-information > span > span"),
    productQuantityInput: () => cy.get('[name="quantity"]'),
    addToCartDetailsBtn: () => cy.get(".cart"),
    productAvailabilityLbl: () => cy.get(".product-information > p").eq(1),
    productConditionLbl: () => cy.get(".product-information > p").eq(2),
    productBrandLbl: () => cy.get(".product-information > p").eq(3),
    brandsSection: () => cy.get(".brands_products"),
    brandsList: () => cy.get(".brands-name"),
    reviewTab: () => cy.get("a[href='#reviews']"),
    reviewNameInput: () => cy.get("#name"),
    reviewEmailInput: () => cy.get("#email"),
    reviewTextArea: () => cy.get("#review"),
    reviewSubmitBtn: () => cy.get("#button-review"),
    recommendedItemsSection: () => cy.get(".recommended_items > .title"),
    recommendedItemsCarousel: () =>
      cy.get("#recommended-item-carousel > .carousel-inner > .active"),
    recommendedAddToCartBtn: () =>
      cy.get(
        "#recommended-item-carousel > .carousel-inner > .active .add-to-cart"
      ),
  };

  checkAllProductsTitle() {
    this.elements.productsListTitle().should("have.text", titles.all_products);
  }

  checkProductList() {
    this.elements.productList().should("be.visible");
  }

  searchProduct(productName) {
    this.elements.searchInput().type(productName);
    this.elements.submitSearchBtn().click();
  }

  checkSearchedProducts() {
    this.elements
      .productsListTitle()
      .should("have.text", titles.searched_products);

    this.elements.productCard().should("have.length", 1);
  }

  addProductToCartFromList(index) {
    this.elements.addToCartListBtn().eq(index).click();
  }

  goToCart() {
    this.elements.viewCartBtn().click();
  }

  closeCartModal() {
    this.elements.continueShoppingBtn().click();
  }

  goToProductDetail(index) {
    this.elements.viewProductBtn().eq(index).click();
  }

  checkProductInformation() {
    this.elements.productDetailsArea().should("be.visible");
    this.elements.productNameLbl().should("be.visible").should("not.be.empty");
    this.elements
      .productCategoryLbl()
      .should("be.visible")
      .should("not.be.empty");
    this.elements.productPriceLbl().should("be.visible").should("not.be.empty");
    this.elements
      .productAvailabilityLbl()
      .should("be.visible")
      .should("not.be.empty");
    this.elements
      .productConditionLbl()
      .should("be.visible")
      .should("not.be.empty");
    this.elements.productBrandLbl().should("be.visible").should("not.be.empty");
  }

  updateQuantity(quantity) {
    this.elements.productQuantityInput().clear().type(quantity);
  }

  addProductToCartFromDetails() {
    this.elements.addToCartDetailsBtn().click();
  }

  checkBrandsVisibility() {
    this.elements.brandsSection().should("be.visible");
  }

  clickOnBrand(brandName) {
    this.elements.brandsList().contains(brandName).click();
  }

  checkReviewFormVisibility() {
    this.elements.reviewTab().should("have.text", "Write Your Review");
  }

  submitReview(name, email, review) {
    this.elements.reviewNameInput().type(name);
    this.elements.reviewEmailInput().type(email);
    this.elements.reviewTextArea().type(review);
    this.elements.reviewSubmitBtn().click();
  }

  checkReviewSuccessMessage() {
    cy.contains("div", "Thank you for your review.").should("be.visible");
  }

  checkRecommendedItemsVisibility() {
    this.elements
      .recommendedItemsSection()
      .scrollIntoView()
      .should("be.visible")
      .should("have.text", "recommended items");
  }

  addRecommendedItemToCart(index) {
    this.elements.recommendedAddToCartBtn().eq(index).click();
  }
}
export default new Products();
