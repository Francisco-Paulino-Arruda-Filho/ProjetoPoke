import PokeData from "../models/PokeData";
import PokeFullData from "../models/PokeFullData";

const fetchPokemonDataByData = async (id: number): Promise<PokeFullData | null> => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
    const speciesData = await speciesResponse.json();
    
    const englishEntry = speciesData.flavor_text_entries.find(
      (entry: any) => entry.language.name === 'en'
    );
    const description = englishEntry?.flavor_text
      .replace(/\n/g, ' ')
      .replace(/\f/g, ' ') || "No description available";

    return {
      id: data.id,
      name: data.name,
      height: data.height,
      weight: data.weight,
      base_experience: data.base_experience,
      abilities: data.abilities.map((ability: any) => ability.ability.name),
      forms: data.forms.map((form: any) => form.name),
      game_indices: data.game_indices.map((game: any) => game.version.name),
      held_items: data.held_items.map((item: any) => item.item.name),
      location_area_encounters: data.location_area_encounters,
      moves: data.moves.map((move: any) => move.move.name),
      order: data.order,
      species: data.species.name,
      sprites: {
        front_default: data.sprites.front_default,
        front_shiny: data.sprites.front_shiny,
        back_default: data.sprites.back_default,
        back_shiny: data.sprites.back_shiny,
        other: {
          dream_world: data.sprites.other?.dream_world?.front_default,
          home: data.sprites.other?.home?.front_default,
          "official-artwork": data.sprites.other?.["official-artwork"]?.front_default,
        }
      },
      stats: data.stats.map((stat: any) => ({
        base_stat: stat.base_stat,
        effort: stat.effort,
        name: stat.stat.name
      })),
      types: data.types.map((type: any) => type.type.name),
      cries: {
        latest: data.cries?.latest,
        legacy: data.cries?.legacy
      },
      is_default: data.is_default,
      past_abilities: data.past_abilities,
      past_types: data.past_types,
      description: description, 
    };
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
    return null;
  }
};

const fetchPokemonData = async (url: string): Promise<PokeData | null> => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data)
      
      const speciesResponse = await fetch(data.species.url);
      const speciesData = await speciesResponse.json();
      const description = speciesData.flavor_text_entries.find((entry: any) => entry.language.name === "en")?.flavor_text || "No description available.";
      
      return {
        id: data.id,
        name: data.name,
        description: description,
        height: `${data.height / 10}`,
        weight: `${data.weight / 10}`,
        types: data.types.map((t: any) => t.type.name),
        image: data.sprites.front_default
      };
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
      return null;
    }
  };

const fetchAllPokemonUrls = async (): Promise<string[]> => {
  try {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1040"); 
      const data = await response.json();
      return data.results.map((pokemon: any) => pokemon.url);
  } catch (error) {
      console.error("Error fetching Pokémon list:", error);
      return [];
  }
};

export { fetchAllPokemonUrls, fetchPokemonData, fetchPokemonDataByData }