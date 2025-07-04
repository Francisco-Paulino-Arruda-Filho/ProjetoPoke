// Seleciona o cartão principal do Pokémon
export const getPokemonCard = () => cy.get('[data-cy="pokemon-card"]');

// Seleciona o chip de tipo específico (ex: Fogo, Água)
export const getPokemonTypeChip = (type: string) =>
  cy.get(`[data-cy="pokemon-type-${type}"]`);

// Seleciona o botão "Editar" de um Pokémon específico
export const getPokemonEditButton = (id: number) =>
  cy.get(`[data-cy="pokemon-button-edit-${id}"]`);

// Seleciona o botão "Remover" de um Pokémon específico
export const getPokemonRemoveButton = (id: number) =>
  cy.get(`[data-cy="pokemon-button-remove-${id}"]`);

// Seleciona o botão "Ver detalhes" de um Pokémon específico
export const getPokemonDetailsButton = (id: number) =>
  cy.get(`[data-cy="pokemon-button-details-${id}"]`);
