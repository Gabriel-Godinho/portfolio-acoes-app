import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_LOGIN + "/api/1.0/users",
});

export const login = async (dados) => {
  try {
    const { data } = await api.post("/auth/login", dados);

    if (data?.username && data?.email && data?.token) {
      localStorage.setItem("username", data.username);
      localStorage.setItem("email", data.email);
      localStorage.setItem("token", data.token);

      return true;
    }

    return false;
  } catch (error) {
    console.error("Erro ao realizar login:", error);
    return false;
  }
};

export const register = async (dados) => {
  const { data } = await api.post("/auth/singup", dados);
  return data;
};

export const authenticatedUser = () => {
  const userToken = localStorage.getItem("token");
  return userToken !== undefined && userToken.length > 0;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("email");
};

export const getAllUsers = async () => {
  const { data } = await api.get("/all");
  console.log(data);

  return data;
};
