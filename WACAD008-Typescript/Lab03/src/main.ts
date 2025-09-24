declare const bootstrap: any;

// Definição da interface Produto
interface Produto {
  id: number;
  tipo: string;
  fabricante: string;
  valor: number;
  detalhes: string;
}

// Classe para gerenciar o carrinho de compras
class Carrinho<T extends Produto> {
  private itens: T[] = [];

  // Adiciona um produto ao carrinho e atualiza o display
  adicionar(produto: T): void {
    this.itens.push(produto);
    this.atualizarDisplay();
  }

  // Remove um produto do carrinho pelo ID e atualiza o display
  remover(id: number): void {
    this.itens = this.itens.filter((p) => p.id !== id);
    this.atualizarDisplay();
  }

  // Calcula o total dos produtos no carrinho
  private calcularTotal(): number {
    return this.itens.reduce((soma, p) => soma + p.valor, 0);
  }

  private atualizarDisplay(): void {
    const carrinhoStats = document.getElementById("carrinhoStats")!;
    if (this.itens.length === 0) {
      carrinhoStats.innerHTML = "<p>Carrinho vazio</p>";
      return;
    }

    // lista dos produtos no carrinho + estatisticas
    carrinhoStats.innerHTML = `
        <ul class="list-group mb-3">
        ${this.itens
          .map(
            (p) => `
          <li class="list-group-item d-flex justify-content-between align-items-center">
            ${p.tipo} - ${p.fabricante} <strong>R$ ${p.valor.toFixed(
              2
            )}</strong>
            <button class="btn btn-sm btn-outline-danger" data-id="${
              p.id
            }">Excluir</button>
          </li>
        `
          )
          .join("")}
      </ul>
      <p><strong>Quantidade de itens:</strong> ${this.itens.length}</p>
      <p><strong>Valor total:</strong> R$ ${this.calcularTotal().toFixed(2)}</p>
    `;

    // eventos de exclusão
    carrinhoStats.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = parseInt((btn as HTMLElement).getAttribute("data-id")!);
        this.remover(id);
      });
    });
  }
}

// Instância do carrinho + seleção de elementos do DOM
const carrinho = new Carrinho<Produto>();
const produtosLista = document.getElementById("produtosLista") as HTMLElement;
const produtoForm = document.getElementById("produtoForm") as HTMLFormElement;
const tipoProduto = document.getElementById("tipoProduto") as HTMLSelectElement;
const camposExtras = document.getElementById("camposExtras") as HTMLElement;
const alertaErro = document.getElementById("alertaErro") as HTMLElement;

let produtos: Produto[] = [];
let contadorId = 1;

tipoProduto.addEventListener("change", () => {
  let html = "";
  // campos extras conforme o tipo
  if (tipoProduto.value === "TV") {
    html = `
      <div class="mb-3">
        <label class="form-label">Modelo</label>
        <input type="text" id="modelo" class="form-control" required>
      </div>
      <div class="mb-3">
        <label class="form-label">Resolução</label>
        <input type="text" id="resolucao" class="form-control" required>
      </div>
      <div class="mb-3">
        <label class="form-label">Tamanho (polegadas)</label>
        <input type="number" id="tamanho" class="form-control" required min="1">
      </div>
    `;
  } else if (tipoProduto.value === "Celular") {
    html = `
      <div class="mb-3">
        <label class="form-label">Modelo</label>
        <input type="text" id="modelo" class="form-control" required>
      </div>
      <div class="mb-3">
        <label class="form-label">Memória</label>
        <input type="text" id="memoria" class="form-control" required>
      </div>
    `;
  } else if (tipoProduto.value === "Bicicleta") {
    html = `
    <div class="mb-3">
        <label class="form-label">Modelo</label>
        <input type="text" id="modelo" class="form-control" required>
      </div>
      <div class="mb-3">
        <label class="form-label">Tamanho do Aro</label>
        <input type="number" id="aro" class="form-control" required min="1">
      </div>
    `;
  }
  camposExtras.innerHTML = html;
});

// validação e submissão do formulário
produtoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  alertaErro.innerHTML = "";

  const tipo = tipoProduto.value;
  const fabricante = (
    document.getElementById("fabricante") as HTMLInputElement
  ).value.trim();
  const valor = Number(
    (document.getElementById("valor") as HTMLInputElement).value
  );

  let detalhes = "";

  if (tipo === "TV") {
    const modelo = (
      document.getElementById("modelo") as HTMLInputElement
    )?.value.trim();
    const resolucao = (
      document.getElementById("resolucao") as HTMLInputElement
    )?.value.trim();
    const tamanho = (document.getElementById("tamanho") as HTMLInputElement)
      ?.value;
    if (!modelo || !resolucao || !tamanho)
      return mostrarErro("Preencha todos os campos da TV.");
    detalhes = `Modelo: ${modelo}, Resolução: ${resolucao}, ${tamanho}"`;
  } else if (tipo === "Celular") {
    const modelo = (
      document.getElementById("modelo") as HTMLInputElement
    )?.value.trim();
    const memoria = (
      document.getElementById("memoria") as HTMLInputElement
    )?.value.trim();
    if (!modelo || !memoria)
      return mostrarErro("Preencha todos os campos do Celular.");
    detalhes = `Modelo: ${modelo}, Memória: ${memoria}`;
  } else if (tipo === "Bicicleta") {
    const modelo = (
      document.getElementById("modelo") as HTMLInputElement
    )?.value.trim();
    const aro = (document.getElementById("aro") as HTMLInputElement)?.value;
    if (!modelo || !aro)
      return mostrarErro("Preencha todos os campos da Bicicleta.");
    detalhes = `Modelo: ${modelo}, Aro: ${aro}`;
  } else {
    return mostrarErro("Selecione um tipo de produto válido.");
  }
  if (!fabricante || valor <= 0) {
    return mostrarErro("Preencha todos os campos.");
  }

  const produto: Produto = {
    id: contadorId++,
    tipo,
    fabricante,
    valor,
    detalhes,
  };

  // adiciona o produto e renderiza
  produtos.push(produto);
  renderizarProduto(produto);

  // reseta o formulário e fecha o modal
  produtoForm.reset();
  camposExtras.innerHTML = "";
  const modal = bootstrap.Modal.getInstance(
    document.getElementById("produtoModal")!
  );
  modal?.hide();
});

function mostrarErro(msg: string) {
  alertaErro.innerHTML = `<div class="alert alert-danger">${msg}</div>`;
}
// renderiza um produto na lista

function renderizarProduto(produto: Produto) {
  const card = document.createElement("div");
  card.className = "card p-3 shadow-sm";

  card.innerHTML = `
    <h5>${produto.tipo} - ${produto.fabricante}</h5>
    <p>${produto.detalhes}</p>
    <p><strong>R$ ${produto.valor.toFixed(2)}</strong></p>
    <div class="d-flex gap-2">
      <button class="btn btn-success btn-sm">Adicionar ao Carrinho</button>
      <button class="btn btn-danger btn-sm">Excluir</button>
    </div>
  `;

  const btns = card.querySelectorAll("button") as NodeListOf<HTMLButtonElement>;
  const btnCarrinho = btns[0];
  const btnExcluir = btns[1];

  btnCarrinho.addEventListener("click", () => {
    carrinho.adicionar(produto);
  });
  btnExcluir.addEventListener("click", () => {
    produtos = produtos.filter((p) => p.id !== produto.id);
    produtosLista.removeChild(card);
    carrinho.remover(produto.id);
  });
  produtosLista.appendChild(card);
}
