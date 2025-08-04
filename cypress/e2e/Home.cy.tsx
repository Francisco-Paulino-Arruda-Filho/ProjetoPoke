describe("Register page", () => {
  it("Checa o fluxo de cadastro de usuário", () => {
    const randomString = Math.random().toString(36).substring(2, 10); // Ex: "f8g7h2k9"
    const testEmail = `${randomString}@gmail.com`;
    const testUser = `TestUser${randomString}`;

    cy.visit('http://localhost:5173/cadastro');

    cy.get('[data-cy="register-name"]').type(testUser);

    cy.get('[data-cy="register-email"]')
      .type(testEmail)

    cy.get('[data-cy="register-password"]').type('teste');
    cy.get('[data-cy="register-button"]').click();

    cy.contains('Cadastro realizado com sucesso!').should('exist');
    cy.url().should('include', '/login');

    cy.get('[data-cy="login-email"]').type(testEmail);
    cy.get('[data-cy="login-password"]').type('teste');
    cy.get('[data-cy="login-button"]').click().then(() => {
      cy.url().should('include', '/home');
    });
  });
});

describe('Home', () => {

  beforeEach(() => {
    cy.visit('http://localhost:5173/login');

    cy.get('[data-cy="login-email"]').type('teste@gmail.com');
    cy.get('[data-cy="login-password"]').type('teste'); 
    cy.get('[data-cy="login-button"]').click();
  });

  it("Checa se o botão de logout funciona", () => {
    cy.get("[data-cy='logout-button']").should('exist').click();
    cy.url().should('include', '/login');
  });

  it('Checa se está navegando para a próxima página', () => {
    cy.get("[data-cy='pokemon-button-details-1']").click();
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

    cy.get("[data-cy='create-team-button']").should('exist').click();

    cy.wait('@createTeam').then((interception) => {
      console.log('Intercepted:', interception);
    });

    cy.wait(500);
    cy.url().should('match', /\/team-builder\/[\w\d]+$/);
  });

  it("Checa se está funcionando adicionando Pokémon ao time", () => {
    cy.get("[data-cy='team-builder-button']").should('exist').click();
    cy.get("[data-cy='create-team-button']").should('exist').click();
    cy.get("[data-cy='add-pokemon-button-0']").click();
    cy.url().should('include', '/selecionar?slot=0');
    cy.get("[data-cy='pokemon-button-add-6']").click();
    cy.url().should('include', '/team-builder');
    cy.get('[data-cy="pokemon-card"]', { timeout: 10000 }).should('contain.text', '#6 - charizard');
  });

  it("Checa se está funcionando removendo Pokémon do time", () => {
    cy.get("[data-cy='team-builder-button']").should('exist').click();
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
    cy.get("[data-cy='team-builder-button']").should('exist').click();
    cy.get("[data-cy='create-team-button']").should('exist').click();
    cy.get("[data-cy='add-pokemon-button-0']").click();
    cy.url().should('include', '/selecionar?slot=0');
    cy.get("[data-cy='pokemon-button-add-6']").click();
    cy.url().should('include', '/team-builder');
    cy.get("[data-cy='pokemon-button-details-6']").click();
    cy.url().should('include', '/pokemon/6');
  });

  it("Checa se o botão de editar Pokémon funciona", () => {
    cy.get("[data-cy='team-builder-button']").should('exist').click();
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
    cy.get("[data-cy='team-builder-button']").should('exist').click();
    cy.get("[data-cy='create-team-button']").should('exist').click();
    cy.get("[data-cy='add-pokemon-button-0']").click();
    cy.url().should('include', '/selecionar?slot=0');
    cy.get("[data-cy='pokemon-button-add-6']").click();
    cy.url().should('include', '/team-builder');
    cy.reload();
    cy.get('[data-cy="pokemon-card"]').should('contain.text', '#6 - charizard');
  });
});

describe("Login Erros", () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
  });

  it("Checa se o login falha com email inválido", () => {
    cy.get('[data-cy="login-email"]').type('email@valido.com');
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