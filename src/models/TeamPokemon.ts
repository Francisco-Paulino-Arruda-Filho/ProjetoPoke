import PokeData from "./PokeData";

interface TeamPokemon {
  _id: number;
  pokemons: (PokeData | null)[];
  userId: string;
}

export default TeamPokemon;