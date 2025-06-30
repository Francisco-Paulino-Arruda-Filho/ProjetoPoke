import { MemoryRouter } from 'react-router-dom';
import PokemonCard from "../PokeCard";
import {
  getPokemonCard,
  getPokemonTypeChip,
  getPokemonDetailsButton,
} from "../../../../cypress/e2e/elements/PokeCardElements";
import mockPokemon from "../../../../cypress/e2e/elements/mockPokemon";

describe('PokemonCard', () => {

  beforeEach(() => {
    cy.mount(
      <MemoryRouter>
        <PokemonCard {...mockPokemon} />
      </MemoryRouter>
    );
  });

  it('Checa se o componente renderiza com as props', () => {
    getPokemonCard().should('contain.text', '#1 - bulbasaur');
    cy.get('p').should('contain.text', 'A strange seed was planted on its back');
    cy.get('img').should('have.attr', 'src', mockPokemon.image);
  });

  it('Checa se a cor correta é aplicada baseada no tipo primário', () => {
    getPokemonTypeChip('grass').should('have.css', 'background-color', 'rgb(120, 200, 80)'); // #78c850
  });

  it('Checa se a cor correta é aplicada baseada no tipo secundário', () => {
    getPokemonTypeChip('poison').should('have.css', 'background-color', 'rgb(160, 64, 160)');
  });

  it('Checa se o botão de detalhes é renderizado', () => {
    getPokemonDetailsButton(mockPokemon.id).should('exist');
  });
});
