context("Smoke tests", () => {
  specify("loads the home page", () => {
    cy.visit("/");

    cy.get("[data-qa=app-footer]").should("be.visible");
  });

  specify("loads the blog", () => {
    cy.visit("/blog");

    cy.get("[data-qa=posts-group-year]").should("contain.text", "2021");
    cy.get("[data-qa=posts-group-year]").should("contain.text", "2020");
    cy.get("[data-qa=posts-group-year]").should("contain.text", "2019");
  });

  specify("loads the notes", () => {
    cy.visit("/notes");

    cy.get("[data-qa=posts-group-year]").should("contain.text", "2021");
    cy.get("[data-qa=posts-group-year]").should("contain.text", "2020");
    cy.get("[data-qa=posts-group-year]").should("contain.text", "2019");
  });
});
