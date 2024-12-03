import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_LOGIN + "/api/Acao/",
});

export const acoes = async () => {
  const { data } = await api.get("/acoes");
  console.log(data);

  return data;
};

export const dividendos = async () => {
  const { data } = await api.get("/dividendos");
  console.log(data);

  return data;
};

export const compra = async () => {
  const { data } = await api.post("/compra");
  console.log(data);

  return data;
}