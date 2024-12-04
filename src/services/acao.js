import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const api = axios.create({
  baseURL: "http://localhost:5071/api/Acao",
});

export const acoes = async () => {
  debugger
  const { data } = await api.get("/acoes");
  console.log(data);

  return data;
};

export const dividendos = async () => {
  debugger
  const { data } = await api.get("/dividendos");
  console.log(data);

  return data;
};

export const compra = async (body) => {
  try {
    const { ticker, quantidade, precoPorAcao } = body;
    const url = `/compra?ticker=${ticker}&quantidade=${quantidade}&precoPorAcao=${precoPorAcao}`;

    const response = await api.post(url);
    
    if (response.status === 200) {
      toast.success("Operação registrada com sucesso!");
    } else {
      toast.error("Falha no registro da operação.");
    }

    return response;
  } catch (error) {
    console.error("Erro na requisição de compra:", error);
    
    // Exibe a mensagem do erro no toast
    toast.error(`Falha ao realizar a operação de compra: ${error.response?.data?.message || error.message || 'Erro desconhecido'}`);
  }
};

export const venda = async (body) => {
  try {
    const { ticker, quantidade, precoPorAcao } = body;
    const url = `/venda?ticker=${ticker}&quantidade=${quantidade}&precoPorAcao=${precoPorAcao}`;

    const response = await api.post(url);
    
    if (response.status === 200) {
      toast.success("Operação registrada com sucesso!");
    } else {
      toast.error("Falha no registro da operação.");
    }

    return response;
  } catch (error) {
    console.error("Erro na requisição de venda:", error);
    
    // Exibe a mensagem do erro no toast
    toast.error(`Falha ao realizar a operação de venda: Verifique a quantidade disponível para venda`);
  }
};