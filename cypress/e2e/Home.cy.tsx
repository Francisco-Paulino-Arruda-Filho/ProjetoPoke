// cypress/e2e/tests.cy.js
import {
  registerUser,
  loginUser,
  logoutUser,
  goToTeamBuilder,
  createTeam,
  addPokemonToSlot,
  removePokemon,
  editPokemon,
  deleteAccount
} from '../e2e/utils';

describe("Register page", () => {
  it("Checa o fluxo de cadastro de usuário", () => {
    const randomString = Math.random().toString(36).substring(2, 10);
    const testEmail = `${randomString}@gmail.com`;
    const testUser = `TestUser${randomString}`;

    registerUser(testUser, testEmail, 'teste');
    cy.contains('Cadastro realizado com sucesso!').should('exist');
    cy.url().should('include', '/login');

    loginUser(testEmail, 'teste');
    cy.url().should('include', '/home');

    deleteAccount();
    cy.url().should('include', '/login');
  });
});

describe('Home', () => {
  const randomString = Math.random().toString(36).substring(2, 10);
  const testEmail = `${randomString}@gmail.com`;
  const testUser = `TestUser${randomString}`;
  beforeEach(() => {
    registerUser(testUser, testEmail, 'teste');
    cy.visit("/login");
    loginUser(testEmail, 'teste');
  });

  afterEach(() => {
    deleteAccount();
  })

  it("Checa se o botão de logout funciona", () => {
    loginUser(testEmail, 'teste');
    logoutUser();
    loginUser(testEmail, 'teste');
    cy.url().should('include', '/home');
  });

  it("Checa se redireciona para a página de Team Builder", () => {
    goToTeamBuilder();
    cy.url().should('include', '/add-pokemon-team');
  });

  it("Checa se está funcionando adicionando Pokémon ao time", () => {
    goToTeamBuilder();
    createTeam();
    addPokemonToSlot(0, 6);
    cy.get('[data-cy="pokemon-card"]').should('contain.text', '#6 - charizard');
  });

  it("Checa se está funcionando removendo Pokémon do time", () => {
    goToTeamBuilder();
    createTeam();
    addPokemonToSlot(0, 6);
    removePokemon(6);
    cy.get('[data-cy="pokemon-card"]').should('not.exist');
  });

  it("Checa se o botão de editar Pokémon funciona", () => {
    goToTeamBuilder();
    createTeam();
    addPokemonToSlot(0, 6);
    editPokemon(6, 3);
    cy.get('[data-cy="pokemon-card"]').should('contain.text', '#3 - venusaur');
  });
});
