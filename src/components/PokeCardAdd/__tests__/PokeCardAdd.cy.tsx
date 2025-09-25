import { MemoryRouter } from "react-router-dom";
import PokemonCardAdd from "../PokeCardAdd";
import mocksPokemon from "../../../../cypress/e2e/elements/mockPokemon"; // agora importamos todos os tipos
import {
  getPokemonTypeChip,
  getPokemonDetailsButton,
  checkPokemonCardContent,
} from "../../../../cypress/e2e/utilCards";
import typeColors from "../../../utils/typeColors";
import hexToRgb from '../../../utils/hexToRgb';

describe("PokemonCardAdd - todos os tipos", () => {
  mocksPokemon.forEach((pokemon) => {
    const props = { ...pokemon, slotIndex: 0 };

    describe(`Renderização do tipo(s): ${pokemon.types.join(", ")}`, () => {
      beforeEach(() => {
        cy.mount(
          <MemoryRouter>
            <PokemonCardAdd {...props} />
          </MemoryRouter>
        );
      });

      it("Checa se o componente renderiza com as props", () => {
        checkPokemonCardContent(pokemon);
      });

      pokemon.types.forEach((type) => {
        it(`Checa se o chip do tipo ${type} renderiza com a cor correta`, () => {
          getPokemonTypeChip(type).should(
            "have.css",
            "background-color",
            hexToRgb(typeColors[type])
          );
        });
      });

      it('Checa se o botão "Ver detalhes" é renderizado', () => {
        getPokemonDetailsButton(pokemon.id as number).should("exist");
      });
    });
  });
});
