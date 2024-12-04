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
import { dividendos } from "../../services/acao";

const defaultTheme = createTheme();

const DividendTable = () => {
  const [dividendData, setDividendData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const dividends = [
        {
          ticker: "AAPL",
          date: "2024-12-01",
          dividendValue: 1.22,
          valuePerShare: 0.25,
        },
        {
          ticker: "MSFT",
          date: "2024-11-20",
          dividendValue: 3.15,
          valuePerShare: 0.50,
        },
      ];

      const backDividends = await dividendos();

      dividends.push(backDividends);

      setDividendData(dividends);
    };

    fetchData();
  }, []);

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
          Tabela de Dividendos
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Ticker</strong></TableCell>
                <TableCell><strong>Data</strong></TableCell>
                <TableCell><strong>Valor dos Dividendos</strong></TableCell>
                <TableCell><strong>Valor por Cota</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dividendData.length > 0 ? (
                dividendData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.ticker}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{`R$ ${row.dividendValue.toFixed(2)}`}</TableCell>
                    <TableCell>{`R$ ${row.valuePerShare.toFixed(2)}`}</TableCell>
                  </TableRow>
                ))
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
}

export default DividendTable;