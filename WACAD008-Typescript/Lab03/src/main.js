// Classe para gerenciar o carrinho de compras
var Carrinho = /** @class */ (function () {
    function Carrinho() {
        this.itens = [];
    }
    // Adiciona um produto ao carrinho e atualiza o display
    Carrinho.prototype.adicionar = function (produto) {
        this.itens.push(produto);
        this.atualizarDisplay();
    };
    // Remove um produto do carrinho pelo ID e atualiza o display
    Carrinho.prototype.remover = function (id) {
        this.itens = this.itens.filter(function (p) { return p.id !== id; });
        this.atualizarDisplay();
    };
    // Calcula o total dos produtos no carrinho
    Carrinho.prototype.calcularTotal = function () {
        return this.itens.reduce(function (soma, p) { return soma + p.valor; }, 0);
    };
    Carrinho.prototype.atualizarDisplay = function () {
        var _this = this;
        var carrinhoStats = document.getElementById("carrinhoStats");
        if (this.itens.length === 0) {
            carrinhoStats.innerHTML = "<p>Carrinho vazio</p>";
            return;
        }
        // lista dos produtos no carrinho + estatisticas
        carrinhoStats.innerHTML = "\n        <ul class=\"list-group mb-3\">\n        ".concat(this.itens
            .map(function (p) { return "\n          <li class=\"list-group-item d-flex justify-content-between align-items-center\">\n            ".concat(p.tipo, " - ").concat(p.fabricante, " <strong>R$ ").concat(p.valor.toFixed(2), "</strong>\n            <button class=\"btn btn-sm btn-outline-danger\" data-id=\"").concat(p.id, "\">Excluir</button>\n          </li>\n        "); })
            .join(""), "\n      </ul>\n      <p><strong>Quantidade de itens:</strong> ").concat(this.itens.length, "</p>\n      <p><strong>Valor total:</strong> R$ ").concat(this.calcularTotal().toFixed(2), "</p>\n    ");
        // eventos de exclusão
        carrinhoStats.querySelectorAll("button").forEach(function (btn) {
            btn.addEventListener("click", function () {
                var id = parseInt(btn.getAttribute("data-id"));
                _this.remover(id);
            });
        });
    };
    return Carrinho;
}());
// Instância do carrinho + seleção de elementos do DOM
var carrinho = new Carrinho();
var produtosLista = document.getElementById("produtosLista");
var produtoForm = document.getElementById("produtoForm");
var tipoProduto = document.getElementById("tipoProduto");
var camposExtras = document.getElementById("camposExtras");
var alertaErro = document.getElementById("alertaErro");
var produtos = [];
var contadorId = 1;
tipoProduto.addEventListener("change", function () {
    var html = "";
    // campos extras conforme o tipo
    if (tipoProduto.value === "TV") {
        html = "\n      <div class=\"mb-3\">\n        <label class=\"form-label\">Modelo</label>\n        <input type=\"text\" id=\"modelo\" class=\"form-control\" required>\n      </div>\n      <div class=\"mb-3\">\n        <label class=\"form-label\">Resolu\u00E7\u00E3o</label>\n        <input type=\"text\" id=\"resolucao\" class=\"form-control\" required>\n      </div>\n      <div class=\"mb-3\">\n        <label class=\"form-label\">Tamanho (polegadas)</label>\n        <input type=\"number\" id=\"tamanho\" class=\"form-control\" required min=\"1\">\n      </div>\n    ";
    }
    else if (tipoProduto.value === "Celular") {
        html = "\n      <div class=\"mb-3\">\n        <label class=\"form-label\">Modelo</label>\n        <input type=\"text\" id=\"modelo\" class=\"form-control\" required>\n      </div>\n      <div class=\"mb-3\">\n        <label class=\"form-label\">Mem\u00F3ria</label>\n        <input type=\"text\" id=\"memoria\" class=\"form-control\" required>\n      </div>\n    ";
    }
    else if (tipoProduto.value === "Bicicleta") {
        html = "\n    <div class=\"mb-3\">\n        <label class=\"form-label\">Modelo</label>\n        <input type=\"text\" id=\"modelo\" class=\"form-control\" required>\n      </div>\n      <div class=\"mb-3\">\n        <label class=\"form-label\">Tamanho do Aro</label>\n        <input type=\"number\" id=\"aro\" class=\"form-control\" required min=\"1\">\n      </div>\n    ";
    }
    camposExtras.innerHTML = html;
});
// validação e submissão do formulário
produtoForm.addEventListener("submit", function (e) {
    var _a, _b, _c, _d, _e, _f, _g;
    e.preventDefault();
    alertaErro.innerHTML = "";
    var tipo = tipoProduto.value;
    var fabricante = document.getElementById("fabricante").value.trim();
    var valor = Number(document.getElementById("valor").value);
    var detalhes = "";
    if (tipo === "TV") {
        var modelo = (_a = document.getElementById("modelo")) === null || _a === void 0 ? void 0 : _a.value.trim();
        var resolucao = (_b = document.getElementById("resolucao")) === null || _b === void 0 ? void 0 : _b.value.trim();
        var tamanho = (_c = document.getElementById("tamanho")) === null || _c === void 0 ? void 0 : _c.value;
        if (!modelo || !resolucao || !tamanho)
            return mostrarErro("Preencha todos os campos da TV.");
        detalhes = "Modelo: ".concat(modelo, ", Resolu\u00E7\u00E3o: ").concat(resolucao, ", ").concat(tamanho, "\"");
    }
    else if (tipo === "Celular") {
        var modelo = (_d = document.getElementById("modelo")) === null || _d === void 0 ? void 0 : _d.value.trim();
        var memoria = (_e = document.getElementById("memoria")) === null || _e === void 0 ? void 0 : _e.value.trim();
        if (!modelo || !memoria)
            return mostrarErro("Preencha todos os campos do Celular.");
        detalhes = "Modelo: ".concat(modelo, ", Mem\u00F3ria: ").concat(memoria);
    }
    else if (tipo === "Bicicleta") {
        var modelo = (_f = document.getElementById("modelo")) === null || _f === void 0 ? void 0 : _f.value.trim();
        var aro = (_g = document.getElementById("aro")) === null || _g === void 0 ? void 0 : _g.value;
        if (!modelo || !aro)
            return mostrarErro("Preencha todos os campos da Bicicleta.");
        detalhes = "Modelo: ".concat(modelo, ", Aro: ").concat(aro);
    }
    else {
        return mostrarErro("Selecione um tipo de produto válido.");
    }
    if (!fabricante || valor <= 0) {
        return mostrarErro("Preencha todos os campos.");
    }
    var produto = {
        id: contadorId++,
        tipo: tipo,
        fabricante: fabricante,
        valor: valor,
        detalhes: detalhes,
    };
    // adiciona o produto e renderiza
    produtos.push(produto);
    renderizarProduto(produto);
    // reseta o formulário e fecha o modal
    produtoForm.reset();
    camposExtras.innerHTML = "";
    var modal = bootstrap.Modal.getInstance(document.getElementById("produtoModal"));
    modal === null || modal === void 0 ? void 0 : modal.hide();
});
function mostrarErro(msg) {
    alertaErro.innerHTML = "<div class=\"alert alert-danger\">".concat(msg, "</div>");
}
// renderiza um produto na lista
function renderizarProduto(produto) {
    var card = document.createElement("div");
    card.className = "card p-3 shadow-sm";
    card.innerHTML = "\n    <h5>".concat(produto.tipo, " - ").concat(produto.fabricante, "</h5>\n    <p>").concat(produto.detalhes, "</p>\n    <p><strong>R$ ").concat(produto.valor.toFixed(2), "</strong></p>\n    <div class=\"d-flex gap-2\">\n      <button class=\"btn btn-success btn-sm\">Adicionar ao Carrinho</button>\n      <button class=\"btn btn-danger btn-sm\">Excluir</button>\n    </div>\n  ");
    var btns = card.querySelectorAll("button");
    var btnCarrinho = btns[0];
    var btnExcluir = btns[1];
    btnCarrinho.addEventListener("click", function () {
        carrinho.adicionar(produto);
    });
    btnExcluir.addEventListener("click", function () {
        produtos = produtos.filter(function (p) { return p.id !== produto.id; });
        produtosLista.removeChild(card);
        carrinho.remover(produto.id);
    });
    produtosLista.appendChild(card);
}
