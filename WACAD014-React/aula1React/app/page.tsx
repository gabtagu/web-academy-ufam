"use client";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ListagemProdutos from "./components/ListagemProdutos/ListagemProdutos";
import CardProdutosTotal from "./components/CardProdutoTotal/CardProdutosTotal";

export default function Produtos() {
  return (
    <div>
      <main>
        <div className="container p-5">
          <CardProdutosTotal />
          <h5 className="mb-3">Produtos disponíveis:</h5>
          <ListagemProdutos />
        </div>
      </main>
    </div>
  );
}
