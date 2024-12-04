import axios from "axios";
import { toast } from "react-toastify";

// Configurando a base URL para sua API
const api = axios.create({
  baseURL: "http://localhost:5071", // Atualize para o endereço correto da sua API
});

export const login = async (dados) => {
  try {
    debugger
    const response = await api.post("/login?useCookies=true&useSessionCookies=true", dados);

    if (response.status === 200) {
      toast.success("Login realizado com sucesso!");
      return true;
    } else {
      toast.error("Falha no login. Verifique suas credenciais.");
      return false;
    }
  } catch (error) {
    toast.error("Falha no login. Verifique suas credenciais.");
  }
};


// Função para realizar registro
export const register = async (dados) => {
  try {
    const { data } = await api.post("/register", dados);
    toast.success("Cadastro realizado com sucesso! Redirecionando para o login...");
    return data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Erro ao realizar registro. Tente novamente.";
    toast.error(errorMessage);
    throw error;
  }
};

// Verifica se o usuário está autenticado
export const authenticatedUser = async () => {
  try {
    const { data } = await api.get("/auth/validate"); // Endpoint para validar o cookie do usuário
    return data.isAuthenticated; // Retorna o status de autenticação
  } catch (error) {
    console.error("Erro ao validar autenticação:", error);
    toast.error("Erro ao validar autenticação. Faça login novamente.");
    return false;
  }
};

// Função para logout
export const logout = async () => {
  try {
    await api.post("/logout"); // Chama o endpoint de logout para invalidar o cookie
    toast.success("Logout realizado com sucesso!");
  } catch (error) {
    console.error("Erro ao realizar logout:", error);
    toast.error("Erro ao realizar logout. Tente novamente.");
  }
};
