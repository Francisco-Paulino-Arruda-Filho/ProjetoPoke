import { MemoryRouter } from 'react-router-dom';
import PokemonCardEdit from '../PokeCardEdit';
import mocksPokemon from '../../../../cypress/e2e/elements/mockPokemon';
import {
  getPokemonTypeChip,
  getPokemonEditButton,
  getPokemonRemoveButton,
  getPokemonDetailsButton,
} from '../../../../cypress/e2e/utilCards';
import typeColors from '../../../utils/typeColors';
import hexToRgb from '../../../utils/hexToRgb';

describe('PokemonCardEdit', () => {
  Object.values(mocksPokemon).forEach((mock) => {
    describe(`Teste do Pokémon ${mock.name}`, () => {
      const props = { ...mock, slotIndex: 0 };

      beforeEach(() => {
        cy.mount(
          <MemoryRouter>
            <PokemonCardEdit {...props} />
          </MemoryRouter>
        );
      });

      it('Checa se os chips de tipo renderizam com a cor correta', () => {
        mock.types.forEach((type) => {
          getPokemonTypeChip(type).should('have.css', 'background-color', hexToRgb(typeColors[type]));
        });
      });

      it('Checa se o botão "Editar" é renderizado e clicável', () => {
        getPokemonEditButton(mock.id as number).should('exist').click();
      });

      it('Checa se o botão "Remover" é renderizado', () => {
        getPokemonRemoveButton(mock.id as number).should('exist');
      });

      it('Checa se o botão "Ver detalhes" é renderizado', () => {
        getPokemonDetailsButton(mock.id as number).should('exist');
      });
    });
  });
});
