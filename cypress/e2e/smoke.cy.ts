context("Smoke tests", () => {
  specify("loads the home page", () => {
    cy.visit("/");

    cy.get("[data-qa=npx-command]").should("contain", "$: npx codecoolture");
  });
});
