describe('PokemonCard', () => {

  it('Checa se está navegando para a próxima página', () => {
    cy.visit("http://localhost:5173/");
    cy.get("[data-cy='pokemon-button-details-1']")
      .click();

    cy.url().should('include', '/pokemon/1');
  });
});
