import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AuthErrorPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f8f8f8"
    >
      <Typography variant="h4" gutterBottom>
        Página não encontrada
      </Typography>
      <Typography variant="body1" gutterBottom>
        A rota que você tentou acessar não existe.
      </Typography>
      <Button variant="contained" onClick={() => navigate("/login")}>
        Ir para Login
      </Button>
    </Box>
  );
};

export default AuthErrorPage;
