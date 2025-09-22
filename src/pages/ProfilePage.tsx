import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Stack,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  console.log("User data:", user);

  const handleLogout = () => {
    localStorage.removeItem("token");
    logout();
    navigate("/login");
  };

  const handleDeleteAccount = async () => {
    setServerError("");
    setSuccessMessage("");

    if (!user?.id) {
      setServerError("Usuário não encontrado.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:8000/user/${user.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const err = await response.json();
        setServerError(err.detail || "Erro ao excluir conta.");
        return;
      }

      const json = await response.json();
      setSuccessMessage(json.msg || "Conta excluída com sucesso.");
      
      // Sai após excluir conta
      setTimeout(() => {
        handleLogout();
      }, 1500);

    } catch (error) {
      console.error(error);
      setServerError("Erro de rede. Tente novamente mais tarde.");
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      <Card sx={{ width: 400, padding: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Perfil do Usuário
          </Typography>

          {serverError && <Alert severity="error" sx={{ mb: 2 }}>{serverError}</Alert>}
          {successMessage && <Alert severity="success" sx={{ mb: 2 }}>{successMessage}</Alert>}

          {user ? (
            <Stack spacing={2}>
              <Typography
                data-cy="email"
              ><strong>Email:</strong> {user.email}</Typography>
              
              <Button
                variant="contained"
                color="primary"
                onClick={handleLogout}
                data-cy="logout-button"
              >
                Sair
              </Button>

              <Button
                variant="contained"
                color="error"
                onClick={handleDeleteAccount}
                data-cy="delete-account-button"
              >
                Excluir Conta
              </Button>
            </Stack>
          ) : (
            <Typography>Carregando dados do usuário...</Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfilePage;
