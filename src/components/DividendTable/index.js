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
      try {
        // Fetching data from your API
        const response = await fetch("http://localhost:5071/api/Acao/dividendos");
        const data = await response.json(); // Assuming the response is a JSON array
        setDividendData(data); // Set the dividend data from the API
      } catch (error) {
        console.error("Error fetching dividend data:", error);
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
                    <TableCell>
                      {typeof row.dividendValue === 'number' && !isNaN(row.dividendValue)
                        ? `R$ ${row.dividendValue.toFixed(2)}`
                        : 'N/A'}
                    </TableCell>
                    <TableCell>
                      {typeof row.valuePerShare === 'number' && !isNaN(row.valuePerShare)
                        ? `R$ ${row.valuePerShare.toFixed(2)}`
                        : 'N/A'}
                    </TableCell>
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