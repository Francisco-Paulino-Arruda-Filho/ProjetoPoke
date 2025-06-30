export const getPokemonCard = () => cy.get('[data-cy="pokemon-card"]');

export const getPokemonTypeChip = (type: string) =>
  cy.get(`[data-cy="pokemon-type-${type}"]`);

export const getPokemonDetailsButton = (id: number) =>
  cy.get(`[data-cy="pokemon-button-details-${id}"]`);
