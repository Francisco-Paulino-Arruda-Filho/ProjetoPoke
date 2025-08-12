import { MemoryRouter } from 'react-router-dom';
import PokemonCard from "../PokeCard";
import mockPokemon from "../../../../cypress/e2e/elements/mockPokemon";
import {
  checkPokemonCardContent,
  checkPrimaryTypeColor,
  checkSecondaryTypeColor,
  checkDetailsButtonExists
} from "../../../../cypress/e2e/utilCards";

describe('PokemonCard', () => {
  beforeEach(() => {
    cy.mount(
      <MemoryRouter>
        <PokemonCard {...mockPokemon} />
      </MemoryRouter>
    );
  });

  it('Checa se o componente renderiza com as props', () => {
    checkPokemonCardContent(mockPokemon);
  });

  it('Checa se a cor correta é aplicada baseada no tipo primário', () => {
    checkPrimaryTypeColor('grass', 'rgb(120, 200, 80)'); // #78c850
  });

  it('Checa se a cor correta é aplicada baseada no tipo secundário', () => {
    checkSecondaryTypeColor('poison', 'rgb(160, 64, 160)');
  });

  it('Checa se o botão de detalhes é renderizado', () => {
    checkDetailsButtonExists(mockPokemon.id as number);
  });
});
