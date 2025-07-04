// Seleciona o cartão principal do Pokémon
export const getPokemonCard = () => cy.get('[data-cy="pokemon-card"]');

// Seleciona o chip de tipo específico (ex: Fogo, Água)
export const getPokemonTypeChip = (type: string) =>
  cy.get(`[data-cy="pokemon-type-${type}"]`);

// Seleciona o botão "Ver detalhes" de um Pokémon específico
export const getPokemonDetailsButton = (id: number) =>
  cy.get(`[data-cy="pokemon-button-details-${id}"]`);

// Seleciona o botão "Adicionar" de um Pokémon específico
export const getPokemonAddButton = (id: number) =>
  cy.get(`[data-cy="pokemon-button-add-${id}"]`);
