describe('Home', () => {
  it('Checa se está navegando para a próxima página', () => {
    cy.visit('http://localhost:5173/');
    cy.get("[data-cy='pokemon-button-details-1']").click();
    cy.url().should('include', '/pokemon/1');
  });

  it("Checa se redireciona para a página de Team Builder", () => {
    cy.visit('http://localhost:5173/');
    cy.get("[data-cy='team-builder-button']").click();
    cy.url().should('include', '/add-pokemon-team');
  });

  it("Checa se o botão de votar funciona", () => {
    cy.visit('http://localhost:5173/');
    cy.get("[data-cy='team-builder-button']").should('exist').click();
    cy.get("[data-cy='back-button']").should('exist').click();
    cy.url().should('include', '/');
  });
});
