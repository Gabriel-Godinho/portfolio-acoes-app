import React, { useState } from "react";
import {
  ThemeProvider,
  createTheme,
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import Sidebar from "../../components/Sidebar";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { compra, venda } from "../../services/acao"

const defaultTheme = createTheme();

const StockForm = () => {
  const [formData, setFormData] = useState({
    ticker: "",
    quantity: "",
    price: "",
    type: "Compra",
  });

  const [errors, setErrors] = useState({
    ticker: false,
    quantity: false,
    price: false,
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const newErrors = {
      ticker: !formData.ticker,
      quantity: !formData.quantity || isNaN(formData.quantity),
      price: !formData.price || isNaN(formData.price),
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error);

    if (!hasErrors) {
      const actionType = formData.type;
      const body = {
        ticker: formData.ticker,
        quantidade: formData.quantity,
        precoPorAcao: formData.price
      }

      if (actionType === "Compra") {
        await compra(body);
      } else if (actionType === "Venda") {
        await venda(body);
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Sidebar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <AttachMoneyIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registro de Ações
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="ticker"
              label="Ticker"
              name="ticker"
              autoComplete="ticker"
              autoFocus
              value={formData.ticker}
              onChange={handleChange}
              error={errors.ticker}
              helperText={errors.ticker ? "Campo obrigatório" : ""}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="quantity"
              label="Quantidade"
              name="quantity"
              autoComplete="quantity"
              value={formData.quantity}
              onChange={handleChange}
              error={errors.quantity}
              helperText={
                errors.quantity ? "Insira um número válido" : ""
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="price"
              label="Preço por Ação"
              name="price"
              autoComplete="price"
              value={formData.price}
              onChange={handleChange}
              error={errors.price}
              helperText={
                errors.price ? "Insira um número válido" : ""
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              select
              id="type"
              label="Tipo"
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <MenuItem value="Compra">Compra</MenuItem>
              <MenuItem value="Venda">Venda</MenuItem>
            </TextField>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Enviar
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default StockForm;
