import PokeData from "./PokeData";

interface TeamPokemon {
  _id: number;
  pokemons: (PokeData | null)[];
}

export default TeamPokemon;