import { Produto } from "../types/produtos";
import apiProdutos from "./api";

export async function getListaProdutos(): Promise<Produto[]> {
  return apiProdutos.get("/produtos").then((response) => response.data);
}
