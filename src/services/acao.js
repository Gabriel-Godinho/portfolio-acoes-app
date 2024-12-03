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

export const compra = async (body) => {
  const { data } = await api.post("/compra", body);
  console.log(data);

  return data;
}

export const venda = async (body) => {
  const { data } = await api.post("/venda", body);
  console.log(data);

  return data;
}