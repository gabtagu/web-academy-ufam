"use client";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TabelaProdutos from "../components/TabelaProdutos/TabelaProdutos";
import ResumoCarrinho from "../components/ResumoCarrinho/ResumoCarrinho";

export default function Carrinho() {
  return (
    <>
      <main>
        <div className="container p-5">
          <TabelaProdutos />
          <ResumoCarrinho />
        </div>
      </main>
    </>
  );
}
