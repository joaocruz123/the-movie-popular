describe("Use pagination", () => {
  it("Browse to http://localhost:3000, click on pages and load new movies", () => {
    cy.visit("http://localhost:3000");

    cy.get("main #pagination").get("ul > li").contains("2").click();

    cy.get("main #pagination").get("ul > li").contains("3").click();
  });
});

describe("Use pagination", () => {
  it("Browse to http://localhost:3000, click on pages and load new movies", () => {
    cy.visit("http://localhost:3000");

    cy.get("#movies").get("#movie-popular-the-little-mermaid").click();
  });
});
