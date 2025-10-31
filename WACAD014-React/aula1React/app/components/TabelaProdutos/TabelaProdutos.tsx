import "bootstrap/dist/css/bootstrap.min.css";

export default function TabelaProdutos() {
  const valorTotalProduto = (
    precoUnitario: number,
    quantidade: number
  ): number => precoUnitario * quantidade;

  return (
    <div className="card mb-4">
      <div className="row card-body">
        <h5 className="card-title mb-4 fw-light">Produtos selecionados</h5>
        <div className="table-responsive">
          <table className="table ">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Valor Unitário</th>
                <th>Quantidade</th>
                <th>Valor Total</th>
                <th>Opções</th>
              </tr>
            </thead>
            <tbody>
              <tr key="1">
                <td>Notebook 1</td>
                <td>R$ {(1500).toFixed(2)}</td>
                <td>2</td>

                <td>R$ {valorTotalProduto(1500, 2).toFixed(2)}</td>
                <td>
                  <button className="btn btn-danger btn-sm">Remover</button>
                </td>
              </tr>

              <tr key="1">
                <td>Notebook 2 </td>
                <td>R$ {(1500).toFixed(2)}</td>
                <td>2</td>

                <td>R$ {valorTotalProduto(1500, 2).toFixed(2)}</td>
                <td>
                  <button className="btn btn-danger btn-sm">Remover</button>
                </td>
              </tr>

              <tr key="1">
                <td>Notebook 3</td>
                <td>R$ {(1500).toFixed(2)}</td>
                <td>3</td>

                <td>R$ {valorTotalProduto(1500, 3).toFixed(2)}</td>
                <td>
                  <button className="btn btn-danger btn-sm">Remover</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
