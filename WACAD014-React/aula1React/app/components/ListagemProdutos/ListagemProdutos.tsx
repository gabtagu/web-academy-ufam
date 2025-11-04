import "bootstrap/dist/css/bootstrap.min.css";
import CardProduto from "../CardProduto/CardProduto";
import { Produto } from "@/app/types/produtos";

interface ListagemProdutosProps {
  produtos: Produto[];
  onAdicionarAoCarrinho: (produto: Produto) => void;
}

export default function ListagemProdutos({
  produtos,
  onAdicionarAoCarrinho,
}: ListagemProdutosProps) {
  return (
    <div>
      <h5 className="mb-3">Produtos Disponíveis</h5>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
        {produtos.map((produto) => (
          <CardProduto
            key={produto.id}
            produto={produto}
            onAdicionarAoCarrinho={onAdicionarAoCarrinho}
          />
        ))}
      </div>
    </div>
  );
}
