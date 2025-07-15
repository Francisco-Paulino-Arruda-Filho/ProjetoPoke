describe('Home', () => {
  it('Checa se está navegando para a próxima página', () => {
    cy.visit('http://localhost:5173/');
    cy.get("[data-cy='pokemon-button-details-1']").click();
    cy.url().should('include', '/pokemon/1');
  });

  it("Checa se redireciona para a página de Team Builder", () => {
    cy.visit('http://localhost:5173/');
    cy.get("[data-cy='team-builder-button']").click();
    cy.url().should('include', '/team-builder');
  });

  it("Checa se o botão de adicionar Pokémon funciona", () => {
    cy.visit('http://localhost:5173/team-builder');
    cy.get("[data-cy='add-pokemon-button-0']").click();
    cy.url().should('include', '/selecionar?slot=0');
    cy.get("[data-cy='pokemon-button-add-6']").click();
    cy.url().should('include', '/team-builder');
    cy.get('[data-cy="pokemon-card"]', { timeout: 10000 }).should('contain.text', '#6 - charizard');
  });

  it("Checa se o botão de remover Pokémon funciona", () => {
    cy.visit('http://localhost:5173/team-builder');
    cy.get("[data-cy='add-pokemon-button-0']").click();
    cy.url().should('include', '/selecionar?slot=0');
    cy.get("[data-cy='pokemon-button-add-6']").click();
    cy.url().should('include', '/team-builder');
    cy.get("[data-cy='pokemon-card']", { timeout: 10000 })
      .first()
      .find("[data-cy='pokemon-button-remove-6']")
      .click();
    cy.get("[data-cy='pokemon-card']").should('not.exist');
  });

  it("Checa se o pokemon é editado corretamente", () => {
    cy.visit('http://localhost:5173/team-builder');
    cy.get("[data-cy='add-pokemon-button-0']").click();
    cy.url().should('include', '/selecionar?slot=0');
    cy.get("[data-cy='pokemon-button-add-6']").click();
    cy.url().should('include', '/team-builder');
    cy.get("[data-cy='pokemon-card']", { timeout: 10000 })
      .first()
      .find("[data-cy='pokemon-button-edit-6']")
      .click();
    cy.url().should('include', '/selecionar?slot=0');
    cy.get("[data-cy='pokemon-button-add-1']").click();
    cy.url().should('include', '/team-builder');
    cy.get('[data-cy="pokemon-card"]', { timeout: 10000 }).should('contain.text', '#1 - bulbasaur');
  });

  it("Cria um time completo com 6 Pokémon", () => {
    cy.visit('http://localhost:5173/team-builder');

    for (let i = 0; i < 6; i++) {
      cy.get(`[data-cy='add-pokemon-button-${i}']`).click();
      cy.url().should('include', `/selecionar?slot=${i}`);
      cy.get(`[data-cy='pokemon-button-add-${i + 1}']`).click();
      cy.url().should('include', '/team-builder');
    }

    cy.get('[data-cy="pokemon-card"]', { timeout: 10000 }).should('have.length', 6);

    const expectedPokemons = [
      '#1 - bulbasaur',
      '#2 - ivysaur',
      '#3 - venusaur',
      '#4 - charmander',
      '#5 - charmeleon',
      '#6 - charizard'
    ];

    expectedPokemons.forEach((name) => {
      cy.contains(name, { timeout: 10000 }).should('exist');
    });
  });

  it("Persiste o time após recarregar a página", () => {
    cy.visit('http://localhost:5173/team-builder');

    cy.get("[data-cy='add-pokemon-button-0']").click();
    cy.get("[data-cy='pokemon-button-add-6']").click();
    cy.url().should('include', '/team-builder');

    cy.reload();

    cy.get('[data-cy="pokemon-card"]', { timeout: 10000 }).should('contain.text', '#6 - charizard');
  });

  it("Editar e não mudar o Pokémon mantém o mesmo", () => {
    cy.visit('http://localhost:5173/team-builder');
    cy.get("[data-cy='add-pokemon-button-0']").click();
    cy.get("[data-cy='pokemon-button-add-6']").click();

    cy.get("[data-cy='pokemon-button-edit-6']").click();
    cy.url().should('include', '/selecionar?slot=0');

    cy.visit('http://localhost:5173/team-builder');

    cy.get('[data-cy="pokemon-card"]', { timeout: 10000 }).should('contain.text', '#6 - charizard');
  });

  it("Checa se o botão de detalhes do Pokémon funciona", () => {
    cy.visit('http://localhost:5173/');
    cy.get("[data-cy='pokemon-button-details-1']").click();
    cy.url().should('include', '/pokemon/1');
    cy.contains('#1 - bulbasaur', { timeout: 10000 }).should('exist');  
  });

  it("Checa se o localStorage persistiu ao mudar de página", () => {
    cy.visit('http://localhost:5173/team-builder');
    cy.get("[data-cy='add-pokemon-button-0']").click();
    cy.get("[data-cy='pokemon-button-add-6']").click();
    cy.url().should('include', '/team-builder');

    cy.visit('http://localhost:5173/');
    cy.visit('http://localhost:5173/team-builder');

    cy.get('[data-cy="pokemon-card"]', { timeout: 10000 }).should('contain.text', '#6 - charizard');
  });
});
