"use client";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ListagemProdutos from "./components/ListagemProdutos/ListagemProdutos";
import ResumoCarrinho from "./components/ResumoCarrinho/ResumoCarrinho";

export default function Produtos() {
  return (
    <div>
      <main>
        <div className="container p-5">
          <ResumoCarrinho />
          <h5 className="mb-3">Produtos disponíveis:</h5>
          <ListagemProdutos />
        </div>
      </main>
    </div>
  );
}
