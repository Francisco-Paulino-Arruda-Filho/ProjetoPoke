import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AppErrorPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Página não encontrada
      </Typography>
      <Typography variant="body1" gutterBottom>
        Verifique se o endereço está correto.
      </Typography>
      <Button variant="contained" onClick={() => navigate("/home")}>
        Voltar para Home
      </Button>
    </Box>
  );
};

export default AppErrorPage;
