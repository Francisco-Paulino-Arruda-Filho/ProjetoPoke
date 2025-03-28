import { useState, useEffect } from "react";
import { fetchAllPokemonUrls, fetchPokemonData } from "../utils/getPokemon";
import PokemonCard from "../components/PokeCard/PokeCard";
import PokeData from "../models/PokeData"; 
import { Box, Grid } from "@mui/material";

const Home: React.FC = () => {
  const [pokemonData, setPokemonData] = useState<PokeData[]>([]);

  useEffect(() => {
    const fetchAllData = async () => {
      const urls = await fetchAllPokemonUrls();
      const data = await Promise.all(urls.map(url => fetchPokemonData(url)));
      setPokemonData(data.filter(pokemon => pokemon !== null));
    };

    fetchAllData();
  }, []);

  return (
    <Box 
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh", 
        textAlign: "center",
        padding: 2,
      }}
    >
      <Grid container spacing={3} justifyContent="center">
        {pokemonData.map((pokemon, index) => (
          <Grid xs={12} sm={6} md={4} key={index} item>
            <PokemonCard {...pokemon} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
