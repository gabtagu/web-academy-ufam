import { useQuery } from "@tanstack/react-query";
import { getListaProdutos } from "../services/produtos";

export function useListaProdutos() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["ListaProdutos"],
    queryFn: () => getListaProdutos(),
  });

  return { produtos: data, isPending, isError };
}
