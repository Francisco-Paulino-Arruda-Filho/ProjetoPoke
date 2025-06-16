import { MemoryRouter } from 'react-router-dom';
import PokemonCard from "../PokeCard";
import PokeData from "../../../models/PokeData";

describe('PokemonCard', () => {
  const mockPokemon: PokeData = {
    id: 1,
    name: 'bulbasaur',
    description: 'A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon.',
    height: '0.7 m',
    weight: '6.9 kg',
    types: ['grass', 'poison'],
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'
  };

  it('Checa se o componente renderiza com a props', () => {
    cy.mount(
      <MemoryRouter>
        <PokemonCard {...mockPokemon} />
      </MemoryRouter>
    );

    cy.get("[data-cy='pokemon-card']").should('contain.text', '#1 - bulbasaur');
    cy.get('p').should('contain.text', 'A strange seed was planted on its back at birth.');
    cy.get('img').should('have.attr', 'src', mockPokemon.image);
  });

  it('Checa se a cor correta é aplicada baseada no tipo', () => {
    cy.mount(
      <MemoryRouter>
        <PokemonCard {...mockPokemon} />
      </MemoryRouter>
    );

    cy.get('[data-cy="pokemon-type-grass"]').first() .should('have.css', 'background-color', 'rgb(120, 200, 80)'); // #78c850
  });

  it('Checa se o tipo a cor do tipo secundário é aplicada corretamente', () => {
    cy.mount(
      <MemoryRouter>
        <PokemonCard {...mockPokemon} />
      </MemoryRouter>
    );
    cy.get('[data-cy="pokemon-type-poison"]').should('have.css', 'background-color', 'rgb(160, 64, 160)'); // ou 'rgb(160, 60, 160)' dependendo da cor real

  });

  it('Checa se o botão é renderizado', () => {
    cy.mount(
      <MemoryRouter>
        <PokemonCard {...mockPokemon} />
      </MemoryRouter>
    );

    cy.get("[data-cy='pokemon-button-details-1']").should('exist');
  });
});
