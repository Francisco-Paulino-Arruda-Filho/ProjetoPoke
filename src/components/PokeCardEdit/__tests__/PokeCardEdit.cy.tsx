import { MemoryRouter } from 'react-router-dom';
import PokemonCardEdit from '../PokeCardEdit';
import mockPokemon from "../../../../cypress/e2e/elements/mockPokemon";
import {
  getPokemonTypeChip,
  getPokemonEditButton,
  getPokemonRemoveButton,
  getPokemonDetailsButton,
  checkPokemonCardContent,
} from '../../../../cypress/e2e/utilCards';

describe('PokemonCardEdit', () => {
  const props = { ...mockPokemon, slotIndex: 0 };

  beforeEach(() => {
    cy.mount(
      <MemoryRouter>
        <PokemonCardEdit {...props} />
      </MemoryRouter>
    );
  });

  it('Checa se o componente renderiza com as props', () => {
    checkPokemonCardContent(mockPokemon);
  });

  it('Checa se os chips de tipo renderizam com a cor correta (primário)', () => {
    getPokemonTypeChip(mockPokemon.types[0]).should('have.css', 'background-color', 'rgb(120, 200, 80)');
  });

  it('Checa se os chips de tipo renderizam com a cor correta (secundário)', () => {
    getPokemonTypeChip(mockPokemon.types[1]).should('have.css', 'background-color', 'rgb(160, 64, 160)');
  });

  it('Checa se o botão "Editar" é renderizado e clicável', () => {
    getPokemonEditButton(mockPokemon.id as number).should('exist').click();
  });

  it('Checa se o botão "Remover" é renderizado', () => {
    getPokemonRemoveButton(mockPokemon.id as number).should('exist');
  });

  it('Checa se o botão "Ver detalhes" é renderizado', () => {
    getPokemonDetailsButton(mockPokemon.id as number).should('exist');
  });
});
