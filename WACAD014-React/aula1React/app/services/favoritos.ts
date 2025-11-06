import axios from "axios";
import { Produto } from "../types/produtos";

const FAVORITOS_BASE = "http://localhost:3002";

export async function postFavorito(produto: Produto): Promise<Produto> {
  const response = await axios.post(`${FAVORITOS_BASE}/favoritos`, produto);
  return response.data;
}

export async function getFavoritos(): Promise<Produto[]> {
  const response = await axios.get(`${FAVORITOS_BASE}/favoritos`);
  return response.data;
}
