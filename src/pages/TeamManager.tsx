import { useEffect, useState } from "react";
import { Box, Button, Typography, Card, CardContent, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TeamPokemon from "../models/TeamPokemon";
import { useAuth } from "../context/AuthProvider";

const TeamManager = () => {
  const [teams, setTeams] = useState<TeamPokemon[]>([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  const loadTeams = async () => {
    try {
      const response = await fetch(`http://localhost:8000/team/${user?.id}/user`);
      const data = await response.json();
      setTeams(data);
    } catch (err) {
      console.error("Erro ao carregar times:", err);
    }
  };

  const handleCreateTeam = async () => {
    if (!user) {
      alert("Usuário não autenticado");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/team", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ user_id: user.id }), // <-- passa o ID do usuário
      });

      if (!response.ok) {
        throw new Error("Erro ao criar time");
      }

      const data = await response.json();
      navigate(`/team-builder/${data._id}`);
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