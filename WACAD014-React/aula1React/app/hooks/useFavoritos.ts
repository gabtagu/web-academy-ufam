"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getFavoritos, postFavorito } from "@/app/services/favoritos";
import { Produto } from "../types/produtos";

export function useListaFavoritos() {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["listaFavoritos"],
    queryFn: () => getFavoritos(),
  });

  return { favoritos: data, refetchFavoritos: refetch, isPending, isError };
}

export function useFavoritarProduto() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (produto: Produto) => postFavorito(produto),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listaFavoritos"] });
    },
  });
  return {
    favoritar: mutation.mutate,
    isPending: mutation.isPending,
  };
}
