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

const TransactionHistoryTable = () => {
  const [transactionData, setTransactionData] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Requisição para o endpoint correto
        const response = await fetch("http://localhost:5071/api/Acao/transacoes");
        const data = await response.json();
        debugger

        // Definir os dados das transações
        setTransactionData(data);
      } catch (error) {
        console.error("Erro ao buscar dados de transações:", error);
      }
    };

    fetchTransactions();
  }, []); // Empty dependency array significa que a requisição será feita apenas uma vez após o carregamento do componente

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
                    <TableCell>{row.data}</TableCell>
                    <TableCell>{row.tipoTransacaoId == 1 ? "Compra" : "Venda"}</TableCell>
                    <TableCell>{row.quantidade}</TableCell>
                    <TableCell>
                      {typeof row.precoPorAcao === 'number' && !isNaN(row.precoPorAcao)
                        ? `R$ ${row.precoPorAcao.toFixed(2)}`
                        : 'N/A'}
                    </TableCell>
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
