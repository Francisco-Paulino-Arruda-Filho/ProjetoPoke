import { 
  Typography, 
  Box, 
  Chip, 
  Paper, 
  Grid, 
  Avatar, 
  List, 
  ListItem, 
  ListItemText, 
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tab,
  Tabs,
  Button
} from "@mui/material";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { fetchPokemonDataByData } from "../utils/getPokemon";
import { useParams, useNavigate } from "react-router-dom";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PokeFullData from "../models/PokeFullData";

const PokePage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState<PokeFullData | null>(null);
  const [tabValue, setTabValue] = useState(0);

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

  const color = pokemon ? getTypeColor(pokemon.types) : "#1976D2";

  useEffect(() => {
    if (id) {
      fetchPokemonDataByData(Number(id)).then(setPokemon);
    }
  }, [id]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  if (!pokemon) return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Typography variant="h5">Carregando Pokémon...</Typography>
    </Box>
  );

  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ 
        p: 3, 
        borderRadius: 4,
        border: `3px solid ${color}`
      }}>
        {/* Cabeçalho */}
        <Box sx={{ 
          textAlign: "center", 
          mb: 4,
          background: color,
          borderRadius: 2,
          p: 2,
          color: "white"
        }}>
          <Typography variant="h3" sx={{ 
            fontWeight: "bold", 
            textTransform: "capitalize",
            mb: 1
          }}>
            #{pokemon.id} - {pokemon.name}
          </Typography>
          
          <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
            {pokemon.types.map((type, index) => (
              <Chip 
                key={index} 
                label={type} 
                sx={{ 
                  textTransform: "capitalize",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  px: 2,
                  py: 1,
                  backgroundColor: getTypeColor([type]),
                  color: "white"
                }} 
              />
            ))}
          </Box>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Button 
            variant="contained" 
            onClick={() => navigate(-1)}
            sx={{ mb: 2 }}
          >
            Voltar
          </Button>
        </Box>

        <Box sx={{ 
          display: "flex", 
          justifyContent: "center", 
          mb: 4,
          bgcolor: "background.paper",
          borderRadius: 3,
          p: 2,
          boxShadow: 2
        }}>
          <img 
            src={pokemon.sprites.front_default} 
            alt={pokemon.name} 
            style={{ 
              width: "100%", 
              maxWidth: 300, 
              height: "auto",
              objectFit: "contain"
            }} 
          />
        </Box>

        {/* Descrição */}
        <Typography variant="body1" sx={{ 
          mb: 4, 
          fontStyle: "italic",
          textAlign: "center",
          fontSize: "1.1rem"
        }}>
          {pokemon.description}
        </Typography>

        {/* Tabs para organização */}
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          variant="fullWidth"
          sx={{ mb: 3 }}
        >
          <Tab label="Informações Básicas" />
          <Tab label="Estatísticas" />
          <Tab label="Habilidades" />
        </Tabs>

        {/* Conteúdo das tabs */}
        <Box sx={{ mb: 4 }}>
          {tabValue === 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper elevation={2} sx={{ p: 2, borderRadius: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>Características</Typography>
                  <List>
                    <ListItem>
                      <ListItemText 
                        primary="Altura" 
                        secondary={`${pokemon.height / 10} m`} 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Peso" 
                        secondary={`${pokemon.weight / 10} kg`} 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Experiência Base" 
                        secondary={pokemon.base_experience} 
                      />
                    </ListItem>
                    {pokemon.abilities && (
                      <ListItem>
                        <ListItemText 
                          primary="Habilidades" 
                          secondary={pokemon.abilities.join(", ")} 
                        />
                      </ListItem>
                    )}
                  </List>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper elevation={2} sx={{ p: 2, borderRadius: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>Tipos</Typography>
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
                      {pokemon.types.map((type, index) => (
                        <Chip 
                          key={index} 
                          label={type} 
                          sx={{ 
                            textTransform: "capitalize",
                            backgroundColor: getTypeColor([type]),
                            color: "white"
                          }} 
                        />
                      ))}
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          )}

          {tabValue === 1 && (
            <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: "bold" }}>Estatísticas de Batalha</Typography>
              <Grid container spacing={2}>
                {pokemon.stats?.map((stat, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box sx={{ width: 120 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                          {capitalize(stat.name)}
                        </Typography>
                      </Box>
                      <Box sx={{ flexGrow: 1, ml: 2 }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Typography variant="body2" sx={{ mr: 1, minWidth: 30 }}>
                            {stat.base_stat}
                          </Typography>
                          <Box sx={{ width: "100%", bgcolor: "divider", borderRadius: 10, height: 8 }}>
                            <Box 
                              sx={{ 
                                width: `${Math.min(100, stat.base_stat)}%`, 
                                height: "100%", 
                                bgcolor: color, 
                                borderRadius: 10 
                              }} 
                            />
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          )}

          {tabValue === 2 && pokemon.abilities && (
            <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: "bold" }}>Habilidades</Typography>
              {pokemon.abilities.map((ability, index) => (
                <Accordion key={index} sx={{ mb: 1 }}>
                  <AccordionSummary 
                    expandIcon={<ExpandMoreIcon />}
                    sx={{ backgroundColor: color, color: "white" }}
                  >
                    <Typography sx={{ fontWeight: "bold" }}>{capitalize(ability)}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Descrição detalhada da habilidade {ability} do Pokémon.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Paper>
          )}
        </Box>

        {/* Movimentos */}
        {pokemon.moves && pokemon.moves.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>Movimentos</Typography>
            <Paper elevation={2} sx={{ p: 2, borderRadius: 3 }}>
              <Box sx={{ 
                display: "flex", 
                flexWrap: "wrap", 
                gap: 1,
                maxHeight: 300,
                overflowY: "auto",
                p: 1
              }}>
                {pokemon.moves.map((move, index) => (
                  <Chip 
                    key={index} 
                    label={capitalize(move)} 
                    variant="outlined"
                    sx={{ 
                      textTransform: "capitalize",
                      borderColor: color,
                      color: color
                    }}
                  />
                ))}
              </Box>
            </Paper>
          </Box>
        )}

        {/* Sprites alternativos */}
        {pokemon.sprites && (
          <Box>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>Sprites</Typography>
            <Paper elevation={2} sx={{ p: 2, borderRadius: 3 }}>
              <Grid container spacing={2}>
                {Object.entries(pokemon.sprites).map(([key, value]) => {
                  if (typeof value === 'string') {
                    return (
                      <Grid item xs={6} sm={4} md={3} key={key}>
                        <Box sx={{ 
                          display: "flex", 
                          flexDirection: "column", 
                          alignItems: "center",
                          p: 1
                        }}>
                          <Avatar 
                            src={value} 
                            alt={`${pokemon.name} ${key}`}
                            sx={{ 
                              width: 80, 
                              height: 80,
                              border: `2px solid ${color}`
                            }}
                            variant="square"
                          />
                          <Typography variant="caption" sx={{ mt: 1 }}>
                            {capitalize(key.replace('_', ' '))}
                          </Typography>
                        </Box>
                      </Grid>
                    );
                  }
                  return null;
                })}
              </Grid>
            </Paper>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default PokePage;