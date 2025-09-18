import React, { useState, useEffect, useCallback, useRef } from "react";
import { fetchPokemonData, fetchAllPokemonUrls } from "../utils/getPokemon";
import { Box, CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid";
import PokeData from "../models/PokeData";
import PokemonCard from "../components/PokeCard/PokeCard";

const PokemonList: React.FC = () => {
  const [pokemons, setPokemons] = useState<PokeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const limit = 20; 
  const isLoadingRef = useRef(false);

  const loadPokemons = useCallback(async () => {
    if (!hasMore || isLoadingRef.current) return;

    isLoadingRef.current = true;
    setLoading(true);

    try {
      const urls = await fetchAllPokemonUrls(offset, limit);
      if (urls.length === 0) {
        setHasMore(false);
        return;
      }

      const newPokemons = await Promise.all(
        urls.map(url => fetchPokemonData(url))
      );

      const validPokemons = newPokemons.filter(p => p !== null) as PokeData[];
      setPokemons(prev => [...prev, ...validPokemons]);
      setOffset(prev => prev + limit);
    } catch (error) {
      console.error("Failed to load Pokémon:", error);
    } finally {
      isLoadingRef.current = false;
      setLoading(false);
    }
  }, [offset, hasMore]);


  useEffect(() => {
    loadPokemons();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        loadPokemons();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadPokemons]);

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
        {pokemons.map((pokemon) => (
          <Grid item key={pokemon.id} xs={12} sm={6} md={4} lg={3}>
            <PokemonCard 
              data-cy={`pokemon-card-${pokemon.id}`}
              {...pokemon} />
          </Grid>
        ))}
      </Grid>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4, width: "100%" }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default PokemonList;