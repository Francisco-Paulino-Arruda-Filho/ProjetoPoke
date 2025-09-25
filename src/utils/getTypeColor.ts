import typeColors from "./typeColors";

const getTypeColor = (types?: string[]): string => {


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
