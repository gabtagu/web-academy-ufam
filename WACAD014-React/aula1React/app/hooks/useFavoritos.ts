"use client";
import { useMutation } from "@tanstack/react-query";
import { postFavorito } from "@/app/services/favoritos";
import { Produto } from "@/app/types/produtos";

export function useFavoritarProduto() {
  return useMutation({
    mutationFn: (produto: Produto) => postFavorito(produto),
  });
}

export default useFavoritarProduto;
