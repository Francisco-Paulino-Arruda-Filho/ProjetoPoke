const getTypeColor = (types?: string[]): string => {
  const typeColors: Record<string, string> = {
    fire: "#f05030",
    water: "#6890f0",
    grass: "#78c850",
    electric: "#e5c531",
    psychic: "#f85888",
    ice: "#98d8d8",
    dragon: "#7038f8",
    dark: "#705848",
    fairy: "#e397d1",
    normal: "#a8a878",
    fighting: "#903028",
    flying: "#a890f0",
    poison: "#a040a0",
    ground: "#cc9f4f",
    rock: "#b8a038",
    bug: "#a8b820",
    ghost: "#705898",
    steel: "#b8b8d0"
  };

  if (!types || types.length === 0) return "#1976D2"; // fallback padrão

  if (types.length === 1) {
    return typeColors[types[0].toLowerCase()] || "#1976D2";
  } else if (types.length === 2) {
    const firstTypeColor = typeColors[types[0].toLowerCase()] || "#1976D2";
    const secondTypeColor = typeColors[types[1].toLowerCase()] || "#1976D2";
    return `linear-gradient(to right, ${firstTypeColor}, ${secondTypeColor})`;
  }

  return "#1976D2";
};

export default getTypeColor;
