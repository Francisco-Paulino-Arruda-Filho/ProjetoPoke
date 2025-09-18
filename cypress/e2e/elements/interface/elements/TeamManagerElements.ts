class TeamManagerElements {
  createTeamButton = () => { return '[data-cy="create-team-button"]' }

  teamCard = (id: number) => { return `[data-cy="team-card-${id}"]` }

  allTeamCards = () => { return '[data-cy^="team-card-"]' }

  editTeamButton = (index: number) => { return `[data-cy="edit-team-button-${index}"]` }

  deleteTeamButton = (index: number) => { return `[data-cy="delete-team-button-${index}"]` }

  pokemonCard = (id: number) => `[data-cy="pokemon-card-${id}"]`;

  editButton = (number: number) => `[data-cy="pokemon-button-edit-${number}"]`;
  removeButton = (number: number) => `[data-cy="pokemon-button-remove-${number}"]`;
  detailsButton = (id: number) => `[data-cy="pokemon-button-details-${id}"]`;

  typeChip = (type: string) => `[data-cy="pokemon-type-${type}"]`;
}

export default TeamManagerElements;
