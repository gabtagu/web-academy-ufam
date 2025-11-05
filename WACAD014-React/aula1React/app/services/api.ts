import axios from "axios";

const apiProdutos = axios.create({
  baseURL: "https://ranekapi.origamid.dev/json/api",
});

export default apiProdutos;
