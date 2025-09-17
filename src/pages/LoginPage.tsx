import React from "react";
import {
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  Box,
  Stack,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { useForm } from "react-hook-form";

interface LoginFormInputs {
  email: string;
  senha: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [serverError, setServerError] = React.useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>();

  const onSubmit = async (data: LoginFormInputs) => {
    setServerError("");

    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: data.email, password: data.senha }),
      });

      if (!response.ok) {
        const err = await response.json();
        setServerError(err.detail || "Credenciais inválidas.");
        return;
      }

      const json = await response.json();
      localStorage.setItem("token", json.access_token);

      login({
        username: data.email,
        id: json.user_id,
        email: data.email,
      });

      navigate("/home");
    } catch (error) {
      console.error(error);
      setServerError("Erro de rede. Tente novamente mais tarde.");
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f0f0f0">
      <Card sx={{ width: 400, p: 2, borderRadius: 3, boxShadow: 6 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" gutterBottom textAlign="center">
            Login
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              {serverError && <Alert severity="error">{serverError}</Alert>}

              <TextField
                label="Email"
                type="email"
                fullWidth
                {...register("email", {
                  required: "Email é obrigatório.",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Email inválido.",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
                data-cy="login-email"
              />

              <TextField
                label="Senha"
                type="password"
                fullWidth
                {...register("senha", {
                  required: "Senha é obrigatória.",
                })}
                error={!!errors.senha}
                helperText={errors.senha?.message}
                data-cy="login-password"
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                data-cy="login-button"
              >
                {isSubmitting ? "Entrando..." : "Entrar"}
              </Button>

              <Typography variant="body2" textAlign="center">
                Não tem uma conta?{" "}
                <Button variant="text" onClick={() => navigate("/cadastro")}>
                  Cadastre-se
                </Button>
              </Typography>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginPage;
