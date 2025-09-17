import { MemoryRouter } from 'react-router-dom';
import PokemonCardAdd from '../PokeCardAdd';
import mockPokemon from "../../../../cypress/e2e/elements/mockPokemon";
import {
  getPokemonTypeChip,
  getPokemonDetailsButton,
  checkPokemonCardContent,
} from "../../../../cypress/e2e/utilCards";

describe('PokemonCardAdd', () => {
  const props = { ...mockPokemon, slotIndex: 0 };

  beforeEach(() => {
    cy.mount(
      <MemoryRouter>
        <PokemonCardAdd {...props} />
      </MemoryRouter>
    );
  });

  it('Checa se o componente renderiza com as props', () => {
    checkPokemonCardContent(mockPokemon);
  });

  it('Checa se os chips de tipo renderizam com a cor correta (primário)', () => {
    getPokemonTypeChip('grass').should('have.css', 'background-color', 'rgb(120, 200, 80)');
  });

  it('Checa se os chips de tipo renderizam com a cor correta (secundário)', () => {
    getPokemonTypeChip('poison').should('have.css', 'background-color', 'rgb(160, 64, 160)');
  });

  it('Checa se o botão "Ver detalhes" é renderizado', () => {
    getPokemonDetailsButton(mockPokemon.id as number).should('exist');
  });
});