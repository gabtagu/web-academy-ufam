import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";

interface Produto {
  id: number;
  nome: string;
  preco: number;
  imagemUrl: string;
}

const produtosMock: Produto[] = [
  { id: 1, nome: "Notebook 1", preco: 1500, imagemUrl: "/placeholder.png" },
  { id: 2, nome: "Notebook 2", preco: 2500, imagemUrl: "/placeholder.png" },
  { id: 3, nome: "Notebook 3", preco: 3500, imagemUrl: "/placeholder.png" },
  { id: 4, nome: "Notebook 4", preco: 4500, imagemUrl: "/placeholder.png" },
];

export default function ListagemProdutos() {
  const CardDoProduto = (produto: Produto) => (
    <div key={produto.id} className="col">
      <div className="card shadow-sm h-100">
        <Image
          src={produto.imagemUrl}
          className="card-img-top"
          alt={`Imagem de ${produto.nome}`}
          width={300}
          height={320}
        />

        <div className="card-body bg-light">
          {/* Campos dinâmicos usando os dados do produto */}
          <h5 className="card-title">{produto.nome}</h5>
          <p className="card-text text-secondary">
            R$ {produto.preco.toFixed(2).replace(".", ",")}
          </p>
          <button className="btn btn-dark d-block w-100" type="button">
            Adicionar no carrinho
          </button>
        </div>
      </div>
    </div>
  );

  return (
    // A div "row" define a estrutura da grade e a responsividade
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
      {/* 4. Mapeia a lista, chamando o CardDoProduto para cada item */}
      {produtosMock.map((produto) => CardDoProduto(produto))}
    </div>
  );
}
