import React, { useEffect, useState } from "react";
import {
  ThemeProvider,
  createTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";

const defaultTheme = createTheme();

const AcaoTable = () => {
  const [acaoData, setAcaoData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching data from your API
        const response = await fetch("http://localhost:5071/api/Acao/acoes");
        const data = await response.json(); // Assuming the response is a JSON array of Acao objects
        setAcaoData(data); // Set the acao data from the API
      } catch (error) {
        console.error("Error fetching acao data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
          Tabela de Ações
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Ticker</strong></TableCell>
                <TableCell><strong>Quantidade</strong></TableCell>
                <TableCell><strong>Total Investido</strong></TableCell>
                <TableCell><strong>Preço Médio</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {acaoData.length > 0 ? (
                acaoData.map((row, index) => {
                  const precoMedio = row.quantidade > 0 ? (row.totalInvestido / row.quantidade) : 0;
                  return (
                    <TableRow key={index}>
                      <TableCell>{row.ticker}</TableCell>
                      <TableCell>{row.quantidade}</TableCell>
                      <TableCell>
                        {typeof row.totalInvestido === 'number' && !isNaN(row.totalInvestido)
                          ? `R$ ${row.totalInvestido.toFixed(2)}`
                          : 'N/A'}
                      </TableCell>
                      <TableCell>
                        {typeof precoMedio === 'number' && !isNaN(precoMedio)
                          ? `R$ ${precoMedio.toFixed(2)}`
                          : 'N/A'}
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    Nenhum dado disponível
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </ThemeProvider>
  );
};

export default AcaoTable;
