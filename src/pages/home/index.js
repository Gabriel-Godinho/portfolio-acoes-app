import Sidebar from "../../components/Sidebar";
import DividendTable from "../../components/DividendTable"
import TransactionHistoryTable from "../../components/TransactionHistoryTable"
import { Container, Box, Typography } from "@mui/material";
import AcaoTable from "../../components/AcaoTable";

const Home = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Container
        maxWidth="lg"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 5,
          pt: 10,
          pb: 5
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h3"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            Bem-vindo(a)
          </Typography>
        </Box>
        <Box>
          <AcaoTable />
        </Box>
        <Box>
          <TransactionHistoryTable />
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
