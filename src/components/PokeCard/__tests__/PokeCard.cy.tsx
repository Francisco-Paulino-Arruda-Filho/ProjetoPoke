import { MemoryRouter } from 'react-router-dom';
import PokemonCard from "../PokeCard";
import mocksPokemon from '../../../../cypress/e2e/elements/mockPokemon';
import {
  checkPokemonCardContent,
  checkPrimaryTypeColor,
  checkSecondaryTypeColor,
  checkDetailsButtonExists
} from "../../../../cypress/e2e/utilCards";
import typeColors from '../../../utils/typeColors';
import hexToRgb from '../../../utils/hexToRgb';

describe('PokemonCard', () => {
  mocksPokemon.forEach((mock) => {
    describe(`Renderização do Pokémon: ${mock.name}`, () => {
      beforeEach(() => {
        cy.mount(
          <MemoryRouter>
            <PokemonCard {...mock} />
          </MemoryRouter>
        );
      });

      it('Checa se o componente renderiza com as props', () => {
        checkPokemonCardContent(mock);
      });

      it('Checa se a cor correta é aplicada baseada no tipo primário', () => {
        checkPrimaryTypeColor(mock.types[0], hexToRgb(typeColors[mock.types[0]]));
      });

      if (mock.types.length > 1) {
        it('Checa se a cor correta é aplicada baseada no tipo secundário', () => {
          checkSecondaryTypeColor(mock.types[1], hexToRgb(typeColors[mock.types[1]]));
        });
      }

      it('Checa se o botão de detalhes é renderizado', () => {
        checkDetailsButtonExists(mock.id as number);
      });
    });
  });
});
