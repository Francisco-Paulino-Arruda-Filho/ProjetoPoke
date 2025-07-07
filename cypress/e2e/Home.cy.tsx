describe('Home', () => {
  it('Checa se está navegando para a próxima página', () => {
    cy.visit('http://localhost:5173/');
    cy.get("[data-cy='pokemon-button-details-1']")
      .click();
    cy.url().should('include', '/pokemon/1');
  });
  it("Checa se redireciona para a página de Team Builder", () => {
    cy.visit('http://localhost:5173/');
    cy.get("[data-cy='team-builder-button']")
      .click();
    cy.url().should('include', '/team-builder');
  });
  it("Checa se o botão de adicionar Pokémon funciona", () => {
    cy.visit('http://localhost:5173/team-builder');
    cy.get("[data-cy='add-pokemon-button-0']")
      .click();
    cy.url().should('include', '/selecionar?slot=0');
    cy.get("[data-cy='pokemon-button-add-6']").click();
    cy.url().should('include', '/team-builder');
    cy.get('[data-cy="pokemon-card"]').should('contain.text', '#6 - charizard');
  });
  it("Checa se o botão de remover Pokémon funciona", () => {
    cy.visit('http://localhost:5173/team-builder');
    cy.get("[data-cy='add-pokemon-button-0']")
      .click();
    cy.url().should('include', '/selecionar?slot=0');
    cy.get("[data-cy='pokemon-button-add-6']").click();
    cy.url().should('include', '/team-builder');
    cy.get("[data-cy='pokemon-card']")
      .first()
      .find("[data-cy='pokemon-button-remove-6']")
      .click();
    cy.get("[data-cy='pokemon-card']").should('not.exist');
  });
  it("Checa se o pokemon é editado corretamente", () => {
    cy.visit('http://localhost:5173/team-builder');
    cy.get("[data-cy='add-pokemon-button-0']")
      .click();
    cy.url().should('include', '/selecionar?slot=0');
    cy.get("[data-cy='pokemon-button-add-6']").click();
    cy.url().should('include', '/team-builder');
    cy.get("[data-cy='pokemon-card']")
      .first()
      .find("[data-cy='pokemon-button-edit-6']")
      .click();
    cy.url().should('include', '/selecionar?slot=0');
    cy.get("[data-cy='pokemon-button-add-1']").click();
    cy.url().should('include', '/team-builder');
    cy.get('[data-cy="pokemon-card"]').should('contain.text', '#1 - bulbasaur');
  });
});
