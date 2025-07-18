import { useEffect, useState } from "react";
import { Box, Button, Typography, Card, CardContent, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TeamPokemon from "../models/TeamPokemon";

const TeamManager = () => {
  const [teams, setTeams] = useState<TeamPokemon[]>([]);
  const navigate = useNavigate();

  const loadTeams = async () => {
    try {
      const response = await fetch("http://localhost:8000/all_teams");
      const data = await response.json();
      console.log("Teams loaded:", data);
      setTeams(data);
    } catch (err) {
      console.error("Erro ao carregar times:", err);
    }
  };

  const handleCreateTeam = async () => {
    try {
      const response = await fetch("http://localhost:8000/team", {
        method: "POST",
      });
      const data = await response.json();
      navigate(`/team-builder/${data._id}`);
    } catch (err) {
      console.error("Erro ao criar time:", err);
    }
  };

  useEffect(() => {
    loadTeams();
  }, []);

  return (
    <Box sx={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Gerenciar Times Pokémon
      </Typography>

      <Button variant="contained" color="primary" onClick={handleCreateTeam} sx={{ mb: 3 }}>
        Criar novo time
      </Button>

      <Grid container spacing={2}>
        {teams.map((team) => (
          console.log("Rendering team:", team._id),
          <Grid item xs={12} sm={6} md={4} key={team._id}>
            <Card onClick={() => navigate(`/team-builder/${team._id}`)} sx={{ cursor: "pointer" }}>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  ID: {team._id}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TeamManager;