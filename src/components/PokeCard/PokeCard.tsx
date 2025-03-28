import React from "react";
import { Card, CardContent, CardMedia, Typography, Chip, Box, Button } from "@mui/material";
import PokeData from "../../models/PokeData";
import { useNavigate } from "react-router-dom";

const PokemonCard: React.FC<PokeData> = (pokemon: PokeData) => {

    const navigate = useNavigate();
    
    const getTypeColor = (types: string[]): string => {
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

        if (types.length === 1) {
            return typeColors[types[0].toLowerCase()] || "#1976D2";
        } else if (types.length === 2) {
            const firstTypeColor = typeColors[types[0].toLowerCase()] || "#1976D2";
            const secondTypeColor = typeColors[types[1].toLowerCase()] || "#1976D2";
            return `linear-gradient(to right, ${firstTypeColor}, ${secondTypeColor})`;
        }
        return "#1976D2"; 
    };

    const color = getTypeColor(pokemon.types); 

    return (
        <Card 
            sx={{
                width: 250,
                margin: 3,
                border: `3px solid ${color}`,
                borderRadius: 2,
                transition: "transform 0.3s ease",
                "&:hover": {
                    transform: "scale(1.05)"
                }
            }}
        >
            <CardContent sx={{ background: color, textAlign: "center" }}>
                <Typography variant="h6" component="div" sx={{ fontWeight: "bold", textTransform: "capitalize", color: "white" }}>
                    #{pokemon.id} - {pokemon.name}
                </Typography>
            </CardContent>

            <CardMedia 
                component="img"
                height="150"
                image={pokemon.image}
                alt={pokemon.name}
                sx={{
                    objectFit: "contain",
                    transition: "transform 0.3s ease",
                    cursor: "pointer",
                    "&:hover": {
                        transform: "scale(1.1)"
                    }
                }}
            />

            <CardContent sx={{ paddingTop: 1 }}>
                <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ maxHeight: 100, overflowY: "auto", fontSize: "0.9rem" }}
                >
                    {pokemon.description}
                </Typography>
            </CardContent>

            <Box sx={{ padding: 1 }}>
                <Typography variant="body2">
                    <strong>Altura:</strong> {pokemon.height} m
                </Typography>
                <Typography variant="body2">
                    <strong>Peso:</strong> {pokemon.weight} kg
                </Typography>

                <Box sx={{ marginTop: 1, display: "flex", flexWrap: "wrap" }}>
                    <strong>Tipos:</strong>
                    {pokemon.types.map((type, index) => (
                        <Chip
                            key={index}
                            label={type}
                            sx={{
                                margin: "3px",
                                backgroundColor: getTypeColor([type]), 
                                color: "white",
                                fontSize: "0.8rem",
                                textTransform: "capitalize"
                            }}
                        />
                    ))}
                </Box>
            </Box>
            <Button variant="contained" color="primary" onClick={() => navigate(`/pokemon/${pokemon.id}`)}>
              Ver detalhes
            </Button>
        </Card>
    );
};

export default PokemonCard;
