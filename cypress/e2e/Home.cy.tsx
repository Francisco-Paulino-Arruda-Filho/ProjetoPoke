describe('Home', () => {

  beforeEach(() => {
    cy.visit('http://localhost:5173/login');

    cy.get('[data-cy="login-email"]').type('fpaulinofilho04@gmail.com');
    cy.get('[data-cy="login-password"]').type('4'); 
    cy.get('[data-cy="login-button"]').click();
  });

  it("Checa se o botão de logout funciona", () => {
    cy.get("[data-cy='logout-button']").should('exist').click();
    cy.url().should('include', '/login');
  });

  it('Checa se está navegando para a próxima página', () => {
    cy.get("[data-cy='pokemon-button-details-1']", {timeout: 10000}).should('exist').click();
    cy.url().should('include', '/pokemon/1');
  });

  it("Checa se redireciona para a página de Team Builder", () => {
    cy.get("[data-cy='team-builder-button']").click();
    cy.url().should('include', '/add-pokemon-team');
  });

  it("Checa se o botão de votar funciona", () => {
    cy.get("[data-cy='team-builder-button']").should('exist').click();
    cy.get("[data-cy='back-button']").should('exist').click();
    cy.url().should('include', '/');
  });

  it("Checa se o botão de criar time funciona", () => {
    cy.intercept('POST', '**/team').as('createTeam');
    cy.get("[data-cy='team-builder-button']").should('exist').click();
    cy.get("[data-cy='create-team-button']", { timeout: 10000 }).should('be.visible').click();

    cy.wait('@createTeam').then((interception) => {
      console.log('Intercepted:', interception);
    });

    cy.wait(500);
    cy.url().should('match', /\/team-builder\/[\w\d]+$/);
  });

  it("Checa se está funcionando adicionando Pokémon ao time", () => {
    cy.get("[data-cy='team-builder-button']").should('exist').click();
    cy.get("[data-cy='create-team-button']", { timeout: 10000 }).should('be.visible').click();
    cy.get("[data-cy='add-pokemon-button-0']", { timeout: 10000 }).should('be.visible').click();
    cy.url().should('include', '/selecionar?slot=0');
    cy.get("[data-cy='pokemon-button-add-6']", { timeout: 10000 }).should('be.visible').click();
    cy.url().should('include', '/team-builder');
    cy.get('[data-cy="pokemon-card"]', { timeout: 10000 }).should('contain.text', '#6 - charizard');
  });

  it("Checa se está funcionando removendo Pokémon do time", () => {
    cy.get("[data-cy='team-builder-button']").should('exist').click();
    cy.get("[data-cy='create-team-button']", { timeout: 10000 }).should('be.visible').click();
    cy.get("[data-cy='add-pokemon-button-0']", { timeout: 10000 }).should('be.visible').click();
    cy.url().should('include', '/selecionar?slot=0');
    cy.get("[data-cy='pokemon-button-add-6']", { timeout: 10000 }).should('be.visible').click();
    cy.url().should('include', '/team-builder');
    cy.get('[data-cy="pokemon-card"]').should('contain.text', '#6 - charizard');
    cy.get("[data-cy='pokemon-button-remove-6']").click();
    cy.get('[data-cy="pokemon-card"]').should('not.exist');
  });

  it("Checa se o botão de ver detalhes funciona", () => {
    cy.get("[data-cy='team-builder-button']").should('exist').click();
    cy.get("[data-cy='create-team-button']", { timeout: 10000 }).should('be.visible').click();
    cy.get("[data-cy='add-pokemon-button-0']", { timeout: 10000 }).should('be.visible').click();
    cy.url().should('include', '/selecionar?slot=0');
    cy.get("[data-cy='pokemon-button-add-6']", { timeout: 10000 }).should('be.visible').click();
    cy.url().should('include', '/team-builder');
    cy.get("[data-cy='pokemon-button-details-6']", {timeout: 10000}).should('be.visible').click();
    cy.url().should('include', '/pokemon/6');
  });

  it("Checa se o botão de editar Pokémon funciona", () => {
    cy.get("[data-cy='team-builder-button']").should('exist').click();
    cy.get("[data-cy='create-team-button']", { timeout: 10000 }).should('be.visible').click();
    cy.get("[data-cy='add-pokemon-button-0']", { timeout: 10000 }).should('be.visible').click();
    cy.url().should('include', '/selecionar?slot=0');
    cy.get("[data-cy='pokemon-button-add-6']", { timeout: 10000 }).should('be.visible').click();
    cy.url().should('include', '/team-builder');
    cy.get('[data-cy="pokemon-card"]', { timeout: 10000 }).should('contain.text', '#6 - charizard');
    cy.get("[data-cy='pokemon-button-edit-6']").click();
    cy.get("[data-cy='pokemon-button-add-3']", { timeout: 15000 }).should('be.visible').click();
    cy.url().should('include', '/team-builder');
    cy.get('[data-cy="pokemon-card"]').should('contain.text', '#3 - venusaur');
  });

  it("Checa a persistência do time após recarregar a página", () => {
    cy.get("[data-cy='team-builder-button']").should('exist').click();
    cy.get("[data-cy='create-team-button']", { timeout: 10000 }).should('be.visible').click();
    cy.get("[data-cy='add-pokemon-button-0']", { timeout: 10000 }).should('be.visible').click();
    cy.url().should('include', '/selecionar?slot=0');
    cy.get("[data-cy='pokemon-button-add-6']", { timeout: 10000 }).should('be.visible').click();
    cy.url().should('include', '/team-builder');
    cy.reload();
    cy.get('[data-cy="pokemon-card"]').should('contain.text', '#6 - charizard');
  });

  it("Montar time completo e verificar persistência", () => {
    cy.get("[data-cy='team-builder-button']").should('exist').click();
    cy.get("[data-cy='create-team-button']").should('exist').click();
    for (let i = 0; i < 6; i++) {
      cy.get(`[data-cy='add-pokemon-button-${i}']`, {timeout: 15000}).should('be.visible').click();
      cy.url().should('include', `/selecionar?slot=${i}`);
      cy.wait(5000); // espera 5 segundos para o botão aparecer
      cy.get(`[data-cy='pokemon-button-add-${i + 1}']`, { timeout: 15000 }).should('be.visible').click();
    }
    cy.reload();
    for (let i = 0; i < 6; i++) {
      cy.get(`[data-cy="pokemon-card"]:contains("#${i + 1}")`, { timeout: 15000 }).should('be.visible');
    }
  });
 
});

describe("Login Erros", () => {
  beforeEach(() => {
    cy.clearCookies(); // limpa cookies de sessão
    cy.clearLocalStorage(); // limpa localStorage, se usado para login
    cy.visit('http://localhost:5173/login');
    cy.url().should('include', '/login'); // garante que estamos na tela correta
  });

  it("Checa se o login falha com email inválido", () => {
    cy.get('[data-cy="login-email"]').type('email@invalido.com');
    cy.get('[data-cy="login-password"]').type('senha');
    cy.get('[data-cy="login-button"]').click();
    cy.contains('Credenciais inválidas.').should('exist');
  });

  it("Checa se o login falha com senha incorreta", () => {
    cy.get('[data-cy="login-email"]').type('email@valido.com');
    cy.get('[data-cy="login-password"]').type('senha-incorreta');
    cy.get('[data-cy="login-button"]').click();
    cy.contains('Credenciais inválidas.').should('exist');
  });
});
