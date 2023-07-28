/// <reference types="cypress" />

describe("Selection of genres to filter", () => {
  it("Browse to http://localhost:3000, click Action and Adventure genres to filter", () => {
    cy.visit("http://localhost:3000");

    cy.get("div #genres").contains("Action").click();

    cy.get("div #genres").contains("Adventure").click();
  });
});

describe("Selection of genres to filter", () => {
  it("Browse to http://localhost:3000, click Action and Adventure genres to filter", () => {
    cy.visit("http://localhost:3000");

    cy.get("div #genres").contains("Family").click();

    cy.get("div #genres").contains("Fantasy").click();

    cy.get("div #genres").get("#unchecking-Family").click();

    cy.get("div #genres").get("#unchecking-Fantasy").click();
  });
});
