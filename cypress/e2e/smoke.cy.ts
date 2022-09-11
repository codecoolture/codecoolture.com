context("Smoke tests", () => {
  specify("loads the home page", () => {
    cy.visit("/");

    cy.get("[data-qa=app-footer]").should("be.visible");
  });
});
