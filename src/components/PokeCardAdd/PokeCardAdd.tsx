import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Box,
  Button,
  Stack,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import getTypeColor from "../../utils/getTypeColor";
import PokeData from "../../models/PokeData";

const MAX_TEAM_SIZE = 6;
const STORAGE_KEY = "my-pokemon-team";

const PokemonCardAdd: React.FC<PokeData> = (pokemon: PokeData) => {
  const navigate = useNavigate();
  const color = getTypeColor(pokemon.types);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const slotIndex = parseInt(queryParams.get('slot') || '0', 10);

  const handleAdd = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const team: (PokeData | null)[] = stored ? JSON.parse(stored) : Array(MAX_TEAM_SIZE).fill(null);

    team[slotIndex] = {
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.image,
      description: pokemon.description,
      height: pokemon.height,
      weight: pokemon.weight,
      types: pokemon.types
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(team));
    //navigate("/team-builder");
    console.log(localStorage.getItem(STORAGE_KEY));
  };

  return (
    <Card
      sx={{
        width: 250,
        margin: 3,
        border: `3px solid ${color}`,
        borderRadius: 2,
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
      data-cy="pokemon-card"
    >
      <CardContent sx={{ background: color, textAlign: "center" }}>
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: "bold",
            textTransform: "capitalize",
            color: "white",
          }}
        >
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
            transform: "scale(1.1)",
          },
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
          {Array.isArray(pokemon.types) && pokemon.types.map((type, index) => (
            <Chip
              data-cy={`pokemon-type-${type}`}
              key={index}
              label={type}
              sx={{
                margin: "3px",
                backgroundColor: getTypeColor([type]),
                color: "white",
                fontSize: "0.8rem",
                textTransform: "capitalize",
              }}
            />
          ))}
        </Box>
      </Box>

      <Stack direction="row" spacing={1} justifyContent="center" sx={{ p: 1 }}>
        <Button
          data-cy={`pokemon-button-add-${pokemon.id}`}
          variant="contained"
          color="success"
          onClick={handleAdd}
        >
           Adicionar
        </Button>

        <Button
          data-cy={`pokemon-button-details-${pokemon.id}`}
          variant="contained"
          color="primary"
          onClick={() => navigate(`/pokemon/${pokemon.id}`)}
        >
          Ver detalhes
        </Button>
      </Stack>
    </Card>
  );
};

export default PokemonCardAdd;
