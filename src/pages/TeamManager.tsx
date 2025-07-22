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
      console.log("Create team response:", response);
      const data = await response.json();
      navigate(`/team-builder/${data._id}`);
      return;
    } catch (err) {
      console.error("Erro ao criar time:", err);
    }
  };

  const handledeleteTeam = async (_id: number) => {
    try {
      const response = await fetch(`http://localhost:8000/team/${_id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao deletar time");
      }

      //window.location.reload();
      setTeams(teams.filter(team => team._id !== _id));
      navigate("/add-pokemon-team");
    } catch (error) {
      console.error("Erro ao deletar time:", error);
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

      <Button 
        data-cy="create-team-button"
        variant="contained" color="primary" onClick={handleCreateTeam} sx={{ mb: 3 }}>
        Criar novo time
      </Button>

      <Grid container spacing={2}>
        {teams.map((team, index) => (
          console.log("Rendering team:", team._id),
          <Grid item xs={12} sm={6} md={4} key={team._id}>
            <Card sx={{ cursor: "pointer" }}
              data-cy={`team-card-${team._id}`}
            >
              <CardContent>
                <Typography variant="h5" component="div">
                  Time {index + 1}
                </Typography>
                <Button 
                  variant="outlined"
                  color="primary"
                  data-cy={`edit-team-button-${index}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/team-builder/${team._id}`);
                  }}
                >
                  Editar
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    handledeleteTeam(team._id);
                  }}
                >
                  Deletar
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TeamManager;