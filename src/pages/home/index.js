import Sidebar from "../../components/Sidebar";
import { Container, Box, Typography } from "@mui/material";

const Home = () => {
  const username = localStorage.getItem("username");

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
            Bem-vindo(a),{" "}
            <span style={{ fontWeight: "bold" }}>{username}!</span> 😃
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
