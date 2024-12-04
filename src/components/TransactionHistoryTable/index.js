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

function TransactionHistoryTable() {
  const [transactionData, setTransactionData] = useState([]);

  // Simulação de chamada ao back-end
  useEffect(() => {
    const fetchTransactions = async () => {
      const simulatedTransactions = [
        {
          ticker: "AAPL",
          date: "2024-12-01",
          type: "Compra",
          quantity: 10,
          pricePerShare: 150.75,
        },
        {
          ticker: "MSFT",
          date: "2024-11-20",
          type: "Venda",
          quantity: 5,
          pricePerShare: 310.5,
        },
      ];
      setTransactionData(simulatedTransactions);
    };

    fetchTransactions();
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
          Histórico de Transações
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Ticker</strong></TableCell>
                <TableCell><strong>Data</strong></TableCell>
                <TableCell><strong>Tipo</strong></TableCell>
                <TableCell><strong>Quantidade</strong></TableCell>
                <TableCell><strong>Preço por Ação</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactionData.length > 0 ? (
                transactionData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.ticker}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.type}</TableCell>
                    <TableCell>{row.quantity}</TableCell>
                    <TableCell>{`R$ ${row.pricePerShare.toFixed(2)}`}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
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

export default TransactionHistoryTable;
