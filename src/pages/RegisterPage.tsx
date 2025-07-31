import React, { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  Box,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const RegisterPage: React.FC = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
        try {
            const response = await fetch("http://localhost:8000/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: nome,  // username = nome no seu backend
                email,
                password: senha,
            }),
            });

            if (!response.ok) {
            const err = await response.json();
            alert(err.detail || "Erro ao cadastrar.");
            return;
            }

            alert("Cadastro realizado com sucesso!");
            navigate("/login");

        } catch (error) {
            alert("Erro de rede ao tentar cadastrar.");
            console.error(error);
        }
    };


  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f0f0f0">
      <Card sx={{ width: 400, p: 2, borderRadius: 3, boxShadow: 6 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" gutterBottom textAlign="center">
            Cadastro
          </Typography>

          <Stack spacing={2}>
            <TextField
              label="Nome"
              variant="outlined"
              fullWidth
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              data-cy="register-name"
            />
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              data-cy="register-email"
            />
            <TextField
              label="Senha"
              type="password"
              variant="outlined"
              fullWidth
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              data-cy="register-password"
            />

            <Button
              variant="contained"
              color="success"
              onClick={handleRegister}
              data-cy="register-button"
            >
              Cadastrar
            </Button>

            <Typography variant="body2" textAlign="center">
              Já tem uma conta?{" "}
              <Button variant="text" onClick={() => navigate("/login")}>
                Entrar
              </Button>
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default RegisterPage;
