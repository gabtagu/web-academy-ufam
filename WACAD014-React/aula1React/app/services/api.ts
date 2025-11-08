import axios from "axios";

const apiProdutos = axios.create({
  baseURL: "https://ranekapi.origamid.dev/json/api",
});

export const apiFavoritos = axios.create({
  baseURL: "https://json-server-teste-react.vercel.app/",
});

//por algum motivo estava dando erro se não exportasse como default
export default apiProdutos;
