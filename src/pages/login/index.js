import React, { useState } from "react";
import { login } from "../../services/authentication";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { NavLink, useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

const Login = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({ email: false, password: false });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    const newErrors = {
      email: !email,
      password: !password,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    try {
      const userCredentials = { email, password };
      const loginSuccessful = await login(userCredentials);

      if (loginSuccessful) navigate("/home");
    } catch (error) {
      // Erros já tratados pelo serviço
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="E-mail"
              name="email"
              autoComplete="email"
              autoFocus
              error={errors.email}
              helperText={errors.email ? "Campo obrigatório" : ""}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              error={errors.password}
              helperText={errors.password ? "Campo obrigatório" : ""}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Entrar
            </Button>
            <Grid container>
              <Grid item>
                <NavLink to="/register" style={{ fontSize: 14 }}>
                  {"Não tem uma conta? Cadastre-se!"}
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
