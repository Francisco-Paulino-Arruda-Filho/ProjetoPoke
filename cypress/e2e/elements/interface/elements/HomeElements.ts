class HomeElements {
  pokemonCard = () => {
    return '[data-cy="pokemon-card"]';
  }

  pokemonType = (type: string) => {
    return `[data-cy="pokemon-type-${type}"]`;
  }

  pokemonButtonDetails = (id: number) => {
    return `[data-cy="pokemon-button-details-${id}"]`;
  }

  allPokemonCards = () => {
    return '[data-cy="pokemon-card"]';
  }

  pokemonTitle = (id: number, name: string) => {
    return cy.contains('[data-cy="pokemon-card"] h6', `#${id} - ${name}`);
  }

  profileButton = () => {
    return '[data-cy="profile-button"]';
  }

  logoutButton = () => {
    return '[data-cy="logout-button"]';
  }
}

export default HomeElements;
