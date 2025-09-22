var Aluno = /** @class */ (function () {
    function Aluno(id, nome, idade, altura, peso) {
        this.id = id;
        this.nome = nome;
        this.idade = idade;
        this.altura = altura;
        this.peso = peso;
    }
    return Aluno;
}());
var Turma = /** @class */ (function () {
    function Turma(id, nome) {
        this.id = id;
        this.nome = nome;
        this.alunos = [];
    }
    Turma.prototype.adicionarAluno = function (aluno) {
        this.alunos.push(aluno);
    };
    Turma.prototype.editarAluno = function (id, dados) {
        var aluno = null;
        // Substitui o find()
        for (var i = 0; i < this.alunos.length; i++) {
            if (this.alunos[i].id === id) {
                aluno = this.alunos[i];
                break;
            }
        }
        // Substitui o Object.assign()
        if (aluno) {
            for (var prop in dados) {
                if (dados.hasOwnProperty(prop)) {
                    aluno[prop] = dados[prop];
                }
            }
        }
    };
    Turma.prototype.removerAluno = function (id) {
        // Substitui filter()
        var novos = [];
        for (var i = 0; i < this.alunos.length; i++) {
            if (this.alunos[i].id !== id) {
                novos.push(this.alunos[i]);
            }
        }
        this.alunos = novos;
    };
    Turma.prototype.getNumAlunos = function () {
        return this.alunos.length;
    };
    Turma.prototype.getMediaIdades = function () {
        if (this.alunos.length === 0)
            return 0;
        var soma = 0;
        for (var i = 0; i < this.alunos.length; i++)
            soma += this.alunos[i].idade;
        return soma / this.alunos.length;
    };
    Turma.prototype.getMediaAlturas = function () {
        if (this.alunos.length === 0)
            return 0;
        var soma = 0;
        for (var i = 0; i < this.alunos.length; i++)
            soma += this.alunos[i].altura;
        return soma / this.alunos.length;
    };
    Turma.prototype.getMediaPesos = function () {
        if (this.alunos.length === 0)
            return 0;
        var soma = 0;
        for (var i = 0; i < this.alunos.length; i++)
            soma += this.alunos[i].peso;
        return soma / this.alunos.length;
    };
    return Turma;
}());
// ================== LÓGICA DOM ==================
var turma = new Turma(1, "Educação Física");
var form = document.getElementById("alunoForm");
var tabelaAlunos = document.getElementById("tabelaAlunos");
var estatisticas = document.getElementById("estatisticas");
form.addEventListener("submit", function (e) {
    e.preventDefault();
    var idField = document.getElementById("alunoId");
    var nomeField = document.getElementById("nome");
    var idadeField = document.getElementById("idade");
    var alturaField = document.getElementById("altura");
    var pesoField = document.getElementById("peso");
    var nome = nomeField.value;
    var idade = parseInt(idadeField.value);
    var altura = parseFloat(alturaField.value);
    var peso = parseFloat(pesoField.value);
    if (idField.value) {
        turma.editarAluno(parseInt(idField.value), { nome: nome, idade: idade, altura: altura, peso: peso });
    }
    else {
        var id = Date.now();
        turma.adicionarAluno(new Aluno(id, nome, idade, altura, peso));
    }
    form.reset();
    idField.value = "";
    atualizarTabela();
    atualizarEstatisticas();
});
function atualizarTabela() {
    tabelaAlunos.innerHTML = "";
    for (var i = 0; i < turma.alunos.length; i++) {
        var aluno = turma.alunos[i];
        var tr = document.createElement("tr");
        tr.innerHTML = "\n      <td>".concat(aluno.nome, "</td>\n      <td>").concat(aluno.idade, "</td>\n      <td>").concat(aluno.altura.toFixed(2), "</td>\n      <td>").concat(aluno.peso.toFixed(1), "</td>\n      <td>\n        <button class=\"btn btn-sm btn-warning me-2\" onclick=\"editar(").concat(aluno.id, ")\">Editar</button>\n        <button class=\"btn btn-sm btn-danger\" onclick=\"remover(").concat(aluno.id, ")\">Remover</button>\n      </td>\n    ");
        tabelaAlunos.appendChild(tr);
    }
}
function atualizarEstatisticas() {
    estatisticas.innerHTML = "\n    N\u00FAmero de alunos: <b>".concat(turma.getNumAlunos(), "</b><br>\n    M\u00E9dia de idades: <b>").concat(turma.getMediaIdades().toFixed(1), "</b><br>\n    M\u00E9dia de alturas: <b>").concat(turma.getMediaAlturas().toFixed(2), "</b> m<br>\n    M\u00E9dia de pesos: <b>").concat(turma.getMediaPesos().toFixed(1), "</b> kg\n  ");
}
// Tornar funções acessíveis no HTML
window.editar = function (id) {
    var aluno = null;
    for (var i = 0; i < turma.alunos.length; i++) {
        if (turma.alunos[i].id === id) {
            aluno = turma.alunos[i];
            break;
        }
    }
    if (aluno) {
        document.getElementById("alunoId").value =
            aluno.id.toString();
        document.getElementById("nome").value = aluno.nome;
        document.getElementById("idade").value =
            aluno.idade.toString();
        document.getElementById("altura").value =
            aluno.altura.toString();
        document.getElementById("peso").value =
            aluno.peso.toString();
    }
};
window.remover = function (id) {
    turma.removerAluno(id);
    atualizarTabela();
    atualizarEstatisticas();
};
// Inicializa estatísticas vazias
atualizarEstatisticas();
