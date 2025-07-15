import { useEffect, useState } from "react";
import { Grid, Button, Card, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useLocation, useNavigate } from "react-router-dom";
import PokeData from "../models/PokeData";
import PokemonCardEdit from "../components/PokeCardEdit/PokeCardEdit";

const MAX_TEAM_SIZE = 6;
const STORAGE_KEY = "my-pokemon-team";

const TeamBuilder = () => {
  const [team, setTeam] = useState<(PokeData | null)[]>(Array(MAX_TEAM_SIZE).fill(null));
  const navigate = useNavigate();
  const location = useLocation(); // Adicione este hook

  // Função para carregar o time
  const loadTeam = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed: (PokeData | null)[] = JSON.parse(stored);
        const normalized = [...parsed];
        while (normalized.length < MAX_TEAM_SIZE) {
          normalized.push(null);
        }
        setTeam(normalized.slice(0, MAX_TEAM_SIZE));
      } catch (e) {
        console.error("Error parsing team data:", e);
      }
    }
  };

  // Carrega o time na montagem inicial e sempre que a localização mudar
  useEffect(() => {
    loadTeam();
  }, [location]); // Recarrega quando a rota muda

  const handleAddPokemon = (slotIndex: number) => {
    navigate(`/selecionar?slot=${slotIndex}`);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Montar Equipe Pokémon
      </Typography>

      <Grid container spacing={2}>
        {team.map((pokemon, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            {pokemon ? (
              <PokemonCardEdit 
                data-cy={`pokemon-card-${index}`}
                {...pokemon} slotIndex={index} />
            ) : (
              <Card
                sx={{
                  padding: 2,
                  textAlign: "center",
                  minHeight: 250,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="body1" gutterBottom>
                  Slot {index + 1}
                </Typography>
                <Button
                  data-cy={`add-pokemon-button-${index}`}
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddPokemon(index)}
                  startIcon={<AddIcon />}
                >
                  Adicionar Pokémon
                </Button>
              </Card>
            )}
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default TeamBuilder;
