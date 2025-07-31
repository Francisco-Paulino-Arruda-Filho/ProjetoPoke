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
import { useAuth } from "../context/AuthProvider";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password: senha }),
      });

      if (!response.ok) {
        const err = await response.json();
        alert(err.detail || "Credenciais inválidas.");
        return;
      }

      const data = await response.json();

      // Salva o token (opcional, se for usar depois para requisições)
      localStorage.setItem("token", data.access_token);

      // Atualiza o contexto de autenticação
      login({
        username: email, id: data.user_id, email: email
      });

      alert("Login realizado com sucesso!");
      navigate("/home");
    } catch (error) {
      alert("Erro de rede ao tentar logar.");
      console.error(error);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f0f0f0">
      <Card sx={{ width: 400, p: 2, borderRadius: 3, boxShadow: 6 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" gutterBottom textAlign="center">
            Login
          </Typography>

          <Stack spacing={2}>
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              data-cy="login-email"
            />
            <TextField
              label="Senha"
              type="password"
              variant="outlined"
              fullWidth
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              data-cy="login-password"
            />

            <Button
              variant="contained"
              color="primary"
              onClick={handleLogin}
              data-cy="login-button"
            >
              Entrar
            </Button>

            <Typography variant="body2" textAlign="center">
              Não tem uma conta?{" "}
              <Button variant="text" onClick={() => navigate("/cadastro")}>
                Cadastre-se
              </Button>
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginPage;

