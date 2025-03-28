interface PokeFullData {
    id: number;
    name: string;
    height: number;
    weight: number;
    base_experience: number;
    abilities: string[];
    forms: string[];
    game_indices: string[];
    held_items: string[];
    location_area_encounters: string;
    moves: string[];
    order: number;
    species: string;
    sprites: {
      front_default: string;
      front_shiny: string;
      back_default: string;
      back_shiny: string;
      other: {
        dream_world?: string;
        home?: string;
        "official-artwork"?: string;
      };
    };
    stats: Array<{
      base_stat: number;
      effort: number;
      name: string;
    }>;
    types: string[];
    cries: {
      latest?: string;
      legacy?: string;
    };
    is_default: boolean;
    past_abilities: any[];
    past_types: any[];
    description: string;
}

export default PokeFullData