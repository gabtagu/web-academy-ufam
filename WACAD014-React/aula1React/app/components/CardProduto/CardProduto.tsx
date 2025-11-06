import React from "react";
import { Produto } from "@/app/types/produtos";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import { useFavoritarProduto } from "@/app/hooks/useFavoritos";

interface CardProdutoProps {
  produto: Produto;
  onAdicionarAoCarrinho: (produto: Produto) => void;
}

export default function CardProduto({
  produto,
  onAdicionarAoCarrinho,
}: CardProdutoProps) {
  const { mutate: favoritar, isPending: favoritando } = useFavoritarProduto();
  const [feedback, setFeedback] = React.useState<{
    type: "success" | "danger" | null;
    message: string | null;
  }>({ type: null, message: null });

  const handleFavoritar = () => {
    favoritar(produto, {
      onSuccess: () => {
        setFeedback({ type: "success", message: "Adicionado aos favoritos." });
        window.setTimeout(
          () => setFeedback({ type: null, message: null }),
          3000
        );
      },
      onError: (error: unknown) => {
        let msg = "Erro ao adicionar aos favoritos.";
        const axiosErr = error as
          | {
              isAxiosError?: boolean;
              response?: {
                status?: number;
                statusText?: string;
                data?: unknown;
              };
            }
          | undefined;

        if (axiosErr?.isAxiosError) {
          if (!axiosErr.response) {
            msg =
              "Network Error: não foi possível conectar ao servidor de favoritos. Verifique se o json-server está rodando em http://localhost:3000";
          } else {
            msg = `Erro ${axiosErr.response.status}: ${axiosErr.response.statusText}`;
            if (axiosErr.response.data)
              msg += ` - ${JSON.stringify(axiosErr.response.data)}`;
          }
        } else {
          msg = (error as Error)?.message || msg;
        }

        console.error("Erro ao favoritar:", error);
        setFeedback({ type: "danger", message: msg });
        window.setTimeout(
          () => setFeedback({ type: null, message: null }),
          7000
        );
      },
    });
  };

  return (
    <div key={produto.id} className="col">
      <div className="card shadow-sm h-100">
        <Image
          src={produto.fotos[0].src}
          className="card-img-top"
          alt={produto.nome}
          width={300}
          height={320}
        />

        <div className="card-body bg-light">
          <h5 className="card-title">{produto.nome}</h5>
          <p className="card-text text-secondary">R$ {produto.preco}</p>

          <div className="d-flex gap-2">
            <button
              className="btn btn-outline-danger"
              type="button"
              onClick={handleFavoritar}
              disabled={favoritando}
              title="Favoritar"
            >
              ♥ Favoritar
            </button>

            <button
              className="btn btn-dark flex-fill"
              type="button"
              onClick={() => onAdicionarAoCarrinho(produto)}
            >
              Adicionar no carrinho
            </button>
          </div>

          {feedback.type && feedback.message && (
            <div className={`alert alert-${feedback.type} mt-2`} role="alert">
              {feedback.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
