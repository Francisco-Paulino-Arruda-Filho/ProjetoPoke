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

  it("Checa se o botão de criar time funciona", () => {
    cy.intercept('POST', '**/team').as('createTeam');

    cy.visit('http://localhost:5173/add-pokemon-team');

    cy.get("[data-cy='create-team-button']").should('exist').click();

    cy.wait('@createTeam').then((interception) => {
      console.log('Intercepted:', interception);
    });

    cy.wait(500);
    cy.url().should('match', /\/team-builder\/[\w\d]+$/);
  });

  it("Checa se está funcionando adicionando Pokémon ao time", () => {
    cy.visit('http://localhost:5173/add-pokemon-team');
    cy.get("[data-cy='create-team-button']").should('exist').click();
    cy.get("[data-cy='add-pokemon-button-0']").click();
    cy.url().should('include', '/selecionar?slot=0');
    cy.get("[data-cy='pokemon-button-add-6']").click();
    cy.url().should('include', '/team-builder');
    cy.get('[data-cy="pokemon-card"]', { timeout: 10000 }).should('contain.text', '#6 - charizard');
  });

  it("Checa se está funcionando removendo Pokémon do time", () => {
    cy.visit('http://localhost:5173/add-pokemon-team');
    cy.get("[data-cy='create-team-button']").should('exist').click();
    cy.get("[data-cy='add-pokemon-button-0']").click();
    cy.url().should('include', '/selecionar?slot=0');
    cy.get("[data-cy='pokemon-button-add-6']").click();
    cy.url().should('include', '/team-builder');
    cy.get('[data-cy="pokemon-card"]').should('contain.text', '#6 - charizard');
    cy.get("[data-cy='pokemon-button-remove-6']").click();
    cy.get('[data-cy="pokemon-card"]').should('not.exist');
  });

  it("Checa se o botão de ver detalhes funciona", () => {
    cy.visit('http://localhost:5173/add-pokemon-team');
    cy.get("[data-cy='create-team-button']").should('exist').click();
    cy.get("[data-cy='add-pokemon-button-0']").click();
    cy.url().should('include', '/selecionar?slot=0');
    cy.get("[data-cy='pokemon-button-add-6']").click();
    cy.url().should('include', '/team-builder');
    cy.get("[data-cy='pokemon-button-details-6']").click();
    cy.url().should('include', '/pokemon/6');
  });

  it("Checa se o botão de editar Pokémon funciona", () => {
    cy.visit('http://localhost:5173/add-pokemon-team');
    cy.get("[data-cy='create-team-button']").should('exist').click();
    cy.get("[data-cy='add-pokemon-button-0']").click();
    cy.url().should('include', '/selecionar?slot=0');
    cy.get("[data-cy='pokemon-button-add-6']").click();
    cy.url().should('include', '/team-builder');
    cy.get('[data-cy="pokemon-card"]', { timeout: 10000 }).should('contain.text', '#6 - charizard');
    cy.get("[data-cy='pokemon-button-edit-6']").click();
    cy.get("[data-cy='pokemon-button-add-3']").click();
    cy.url().should('include', '/team-builder');
    cy.get('[data-cy="pokemon-card"]').should('contain.text', '#3 - venusaur');
  });

  it("Checa a persistência do time após recarregar a página", () => {
    cy.visit('http://localhost:5173/add-pokemon-team');
    cy.get("[data-cy='create-team-button']").should('exist').click();
    cy.get("[data-cy='add-pokemon-button-0']").click();
    cy.url().should('include', '/selecionar?slot=0');
    cy.get("[data-cy='pokemon-button-add-6']").click();
    cy.url().should('include', '/team-builder');
    cy.reload();
    cy.get('[data-cy="pokemon-card"]').should('contain.text', '#6 - charizard');
  });

  it("Montar time completo e verificar persistência", () => {
    cy.visit('http://localhost:5173/add-pokemon-team');
    cy.get("[data-cy='create-team-button']").should('exist').click();
    for (let i = 0; i < 6; i++) {
      cy.get(`[data-cy='add-pokemon-button-${i}']`).click();
      cy.url().should('include', `/selecionar?slot=${i}`);
      cy.get(`[data-cy='pokemon-button-add-${i + 1}']`).click(); // Adiciona Pokémon com ID de 1 a 6
      cy.url().should('include', '/team-builder');
    }
    cy.reload();
    for (let i = 0; i < 6; i++) {
      cy.get('[data-cy="pokemon-card"]').should('contain.text', `#${i + 1}`);
    }
  });
});
