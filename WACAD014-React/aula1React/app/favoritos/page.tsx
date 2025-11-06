"use client";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useQuery } from "@tanstack/react-query";
import { getFavoritos } from "../services/favoritos";
import { Produto } from "../types/produtos";
import Image from "next/image";

export default function Favoritos() {
  const {
    data: favoritos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["favoritos"],
    queryFn: () => getFavoritos(),
  });

  if (isLoading) {
    return (
      <div className="container p-5">
        <h5>Carregando favoritos...</h5>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container p-5">
        <div className="alert alert-danger">
          Erro ao carregar produtos favoritos. Por favor, tente novamente.
        </div>
      </div>
    );
  }

  if (!favoritos || favoritos.length === 0) {
    return (
      <div className="container p-5">
        <div className="alert alert-info">
          Você ainda não possui produtos favoritos.
        </div>
      </div>
    );
  }

  return (
    <div className="container p-5">
      <h5 className="mb-4">Meus Favoritos</h5>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
        {favoritos.map((produto: Produto) => (
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
