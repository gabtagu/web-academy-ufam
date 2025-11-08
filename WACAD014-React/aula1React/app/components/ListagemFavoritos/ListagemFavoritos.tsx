"use client";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Produto } from "@/app/types/produtos";
import { RefetchOptions, QueryObserverResult } from "@tanstack/react-query";

interface IListagemFavoritosProps {
  itensFavoritos: Produto[];
  refecthFavoritos: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<Produto[], Error>>;
}

const ListagemFavoritos: React.FC<IListagemFavoritosProps> = ({
  itensFavoritos,
  refecthFavoritos,
}) => {
  const handleRemoverFavorito = (produtoId: string) => {
    console.log(`Remover favorito com ID: ${produtoId}`);
  };

  return (
    <div className="card mb-4 shadow-sm">
      <div className="row card-body">
        <h5 className="card-title mb-4 fw-bold">
          Produtos Favoritados ({itensFavoritos.length})
        </h5>

        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Produto</th>
                <th className="text-end">Valor</th>
                <th className="text-center">Opções</th>
              </tr>
            </thead>
            <tbody>
              {itensFavoritos.map((produto) => (
                <tr key={produto.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="ms-3">
                        <p className="fw-bold mb-1">{produto.nome}</p>
                        <p className="text-muted mb-0 small">{produto.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="text-end">R$ {produto.preco}</td>
                  <td className="text-center">
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleRemoverFavorito(produto.id)}
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-end mt-3">
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => refecthFavoritos()}
          >
            Atualizar Lista
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListagemFavoritos;
