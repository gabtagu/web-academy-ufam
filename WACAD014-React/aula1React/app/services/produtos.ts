import apiProdutos from "./api";

export async function getListaProdutos() {
  return apiProdutos.get("/produtos").then((response) => response.data);
}
