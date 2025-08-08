// cypress/support/testActions.js
export const registerUser = (name, email, password) => {
  cy.visit('http://localhost:5173/cadastro');

  cy.get('[data-cy="register-name"]').type(name);
  cy.get('[data-cy="register-email"]').type(email);
  cy.get('[data-cy="register-password"]').type(password);
  cy.get('[data-cy="register-button"]').click();
};

export const loginUser = (email, password) => {
  cy.visit('http://localhost:5173/login');
  cy.get('[data-cy="login-email"]').type(email);
  cy.get('[data-cy="login-password"]').type(password);
  cy.get('[data-cy="login-button"]').click();
};

export const logoutUser = () => {
  cy.get("[data-cy='logout-button']").click();
};

export const goToTeamBuilder = () => {
  cy.get("[data-cy='team-builder-button']").click();
};

export const createTeam = () => {
  cy.get("[data-cy='create-team-button']").click();
};

export const addPokemonToSlot = (slotIndex, pokemonId) => {
  cy.get(`[data-cy='add-pokemon-button-${slotIndex}']`).click();
  cy.url().should('include', `/selecionar?slot=${slotIndex}`);
  cy.get(`[data-cy='pokemon-button-add-${pokemonId}']`).click();
};

export const removePokemon = (pokemonId) => {
  cy.get(`[data-cy='pokemon-button-remove-${pokemonId}']`).click();
};

export const editPokemon = (currentId, newId) => {
  cy.get(`[data-cy='pokemon-button-edit-${currentId}']`).click();
  cy.get(`[data-cy='pokemon-button-add-${newId}']`).click();
};

export const deleteAccount = () => {
  cy.get('[data-cy="profile-button"]').click(); // vai para página de perfil
  cy.url().should('include', '/perfil');
  cy.get('[data-cy="delete-account-button"]').click(); // clica no botão excluir conta

  cy.wait(1500);
  // Confirma que voltou para o login
  cy.url().should('include', '/login');
};
