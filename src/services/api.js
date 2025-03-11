import axios from "axios";

const api = axios.create({
  baseURL: "https://extranet.fcc.org.br/webapi/testecandidato/v1",
});

export const getClients = async () => {
  const response = await api.get("/Cliente/Listar");
  return response.data;
};