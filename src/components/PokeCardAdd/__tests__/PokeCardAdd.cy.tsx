import { MemoryRouter } from 'react-router-dom';
import PokemonCardAdd from '../PokeCardAdd';
import {
  getPokemonCard,
  getPokemonTypeChip,
  getPokemonDetailsButton,
} from "../../../../cypress/e2e/elements/PokeAddCardElements";
import mockPokemon from "../../../../cypress/e2e/elements/mockPokemon";

describe('PokemonCardEdit', () => {
  const props = { ...mockPokemon, slotIndex: 0 };

  beforeEach(() => {
    cy.mount(
      <MemoryRouter>
        <PokemonCardAdd {...props} />
      </MemoryRouter>
    );
  });

  it('Checa se o componente renderiza com as props', () => {
    getPokemonCard().should('contain.text', `#${mockPokemon.id} - ${mockPokemon.name}`);
    cy.get('p').should('contain.text', mockPokemon.description);
    cy.get('img').should('have.attr', 'src', mockPokemon.image);
  });

  it('Checa se os chips de tipo renderizam com a cor correta (primário)', () => {
    getPokemonTypeChip('grass').should('have.css', 'background-color', 'rgb(120, 200, 80)'); // #78c850
  });

  it('Checa se os chips de tipo renderizam com a cor correta (secundário)', () => {
    getPokemonTypeChip('poison').should('have.css', 'background-color', 'rgb(160, 64, 160)');
  });

  it('Checa se o botão "Ver detalhes" é renderizado', () => {
    getPokemonDetailsButton(mockPokemon.id!).should('exist');
  });
});
