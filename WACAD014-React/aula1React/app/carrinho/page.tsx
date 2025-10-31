"use client";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TabelaProdutos from "../components/TabelaProdutos/TabelaProdutos";
import CardProdutosTotal from "../components/CardProdutoTotal/CardProdutosTotal";

export default function Carrinho() {
  return (
    <>
      <main>
        <div className="container p-5">
          <TabelaProdutos />
          <CardProdutosTotal />
        </div>
      </main>
    </>
  );
}
