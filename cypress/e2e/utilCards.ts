import PokeData from "../../src/models/PokeData";

export const checkPokemonCardContent = (mockPokemon: PokeData) => {
    cy.get('[data-cy="pokemon-card"]').should('contain.text', `#${mockPokemon.id} - ${mockPokemon.name}`);
    cy.get('p').should('contain.text', mockPokemon.description);
    cy.get('img').should('have.attr', 'src', mockPokemon.image);
};

export const checkPrimaryTypeColor = (type: string, expectedColor: string) => {
  cy.get(`[data-cy="pokemon-type-${type}"]`).should('have.css', 'background-color', expectedColor);
};

export const checkSecondaryTypeColor = (type: string, expectedColor: string) => {
    cy.get(`[data-cy="pokemon-type-${type}"]`).should('have.css', 'background-color', expectedColor);
};

export const checkDetailsButtonExists = (id: number) => {
  cy.get(`[data-cy="pokemon-button-details-${id}"]`).should('exist');
};

export const getPokemonEditButton = (number: number) =>
  cy.get(`[data-cy="pokemon-button-edit-${number}"]`);

export const getPokemonRemoveButton = (number: number) =>
  cy.get(`[data-cy="pokemon-button-remove-${number}"]`);

export const getPokemonDetailsButton = (id: number) =>
  cy.get(`[data-cy="pokemon-button-details-${id}"]`);

export const getPokemonCard = () => cy.get('[data-cy="pokemon-card"]');

export const getPokemonTypeChip = (type: string) =>
  cy.get(`[data-cy="pokemon-type-${type}"]`);

