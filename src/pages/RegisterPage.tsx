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
import { useForm } from "react-hook-form";

interface RegisterFormInputs {
  nome: string;
  email: string;
  senha: string;
}

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = React.useState("");
  const [serverSuccess, setServerSuccess] = React.useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormInputs>();

  const onSubmit = async (data: RegisterFormInputs) => {
    setServerError("");
    setServerSuccess("");

    try {
      const response = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: data.nome, // compatível com backend
          email: data.email,
          password: data.senha,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        setServerError(err.detail || "Erro ao cadastrar.");
        return;
      }

      setServerSuccess("Cadastro realizado com sucesso!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      console.error(error);
      setServerError("Erro de rede ao tentar cadastrar.");
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f0f0f0">
      <Card sx={{ width: 400, p: 2, borderRadius: 3, boxShadow: 6 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" gutterBottom textAlign="center">
            Cadastro
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              {serverError && <Alert severity="error">{serverError}</Alert>}
              {serverSuccess && <Alert severity="success">{serverSuccess}</Alert>}

              <TextField
                label="Nome"
                fullWidth
                {...register("nome", {
                  required: "Nome é obrigatório.",
                  minLength: { value: 2, message: "Nome muito curto." },
                })}
                error={!!errors.nome}
                helperText={errors.nome?.message}
                data-cy="register-name"
              />

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
                data-cy="register-email"
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
                data-cy="register-password"
              />

              <Button
                type="submit"
                variant="contained"
                color="success"
                disabled={isSubmitting}
                data-cy="register-button"
              >
                {isSubmitting ? "Cadastrando..." : "Cadastrar"}
              </Button>

              <Typography variant="body2" textAlign="center">
                Já tem uma conta?{" "}
                <Button variant="text" onClick={() => navigate("/login")}>
                  Entrar
                </Button>
              </Typography>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default RegisterPage;
