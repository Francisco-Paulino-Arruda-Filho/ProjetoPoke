class TeamBuilderElements {

  pokemonCard = (index: number) => {
    return `[data-cy="pokemon-card-${index}"]`;
  }

  addPokemonButton = (index: number) => {
    return `[data-cy="pokemon-button-add-${index}"]`;
  }

  pageHavePokemonText = () => {
    return `[data-cy="pokemon-name"]`
  }

  allPokemonCards = () => {
    return '[data-cy="pokemon-card"]';
  }

  allAddButtons = () => {
    return '[data-cy="add-pokemon-button"]';
  }

  editButton = (number: number) => `[data-cy="pokemon-button-edit-${number}"]`;

  removeButton = (number: number) => `[data-cy="pokemon-button-remove-${number}"]`;

  detailsButton = (id: number) => `[data-cy="pokemon-button-details-${id}"]`;
}

export default TeamBuilderElements;
