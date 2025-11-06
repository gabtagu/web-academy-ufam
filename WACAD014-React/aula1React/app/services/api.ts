import axios from "axios";

const apiProdutos = axios.create({
  baseURL: "https://ranekapi.origamid.dev/json/api",
});

export const apiFavoritos = axios.create({
  baseURL: "https://api.produtosfav.com/favoritos",
});

//por algum motivo estava dando erro se não exportasse como default
export default apiProdutos;
