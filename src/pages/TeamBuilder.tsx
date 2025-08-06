import { useEffect, useState, useCallback } from "react";
import { Grid, Button, Card, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PokeData from "../models/PokeData";
import PokemonCardEdit from "../components/PokeCardEdit/PokeCardEdit";
import CustomAlert from "../components/CustomAlert";

const MAX_TEAM_SIZE = 6;

const TeamBuilder = () => {
  const [team, setTeam] = useState<(PokeData | null)[]>(Array(MAX_TEAM_SIZE).fill(null));
  const [alert, setAlert] = useState<{ message: string; type: "success" | "error" | "warning" | "info" } | null>(null);
  const navigate = useNavigate();
  const location = useLocation(); 
  const { id } = useParams<{ id: string }>();

  const showAlert = (message: string, type: "success" | "error" | "warning" | "info") => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);
  };

  const loadTeam = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:8000/team/${id}`);
      if (!response.ok) {
        throw new Error("Erro ao carregar time");
      }
      const data = await response.json();
      const normalized = [...data.team];

      while (normalized.length < MAX_TEAM_SIZE) {
        normalized.push(null);
      }

      setTeam(normalized.slice(0, MAX_TEAM_SIZE));
      showAlert("Time carregado com sucesso!", "success");
    } catch (e) {
      console.error("Erro ao carregar time:", e);
      showAlert("Erro ao carregar time!", "error");
    }
  }, [id]);

  useEffect(() => {
    loadTeam();
  }, [location, loadTeam]);

  const handleAddPokemon = (slotIndex: number) => {
    navigate(`/${id}/selecionar?slot=${slotIndex}`);
  };

  return (
    <div style={{ padding: "2rem" }}>
      {alert && <CustomAlert type={alert.type} message={alert.message} />}

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
