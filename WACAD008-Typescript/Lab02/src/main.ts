// classe onde é definido os atributos do aluno
class Aluno {
  constructor(
    public id: number,
    public nome: string,
    public idade: number,
    public altura: number,
    public peso: number
  ) {}
}

// classe onde é definido os atributos da turma e métodos para manipulação dos alunos
class Turma {
  public alunos: Aluno[] = [];

  constructor(public id: number, public nome: string) {}
  adicionarAluno(aluno: Aluno) {
    this.alunos.push(aluno);
  }
  editarAluno(id: number, dados: Partial<Aluno>) {
    let aluno: Aluno | null = null;

    for (let i = 0; i < this.alunos.length; i++) {
      if (this.alunos[i].id === id) {
        aluno = this.alunos[i];
        break;
      }
    }
    if (aluno) {
      for (let prop in dados) {
        if ((dados as any).hasOwnProperty(prop)) {
          (aluno as any)[prop] = (dados as any)[prop];
        }
      }
    }
  }

  // método para remover aluno da turma
  removerAluno(id: number) {
    let novos: Aluno[] = [];
    for (let i = 0; i < this.alunos.length; i++) {
      if (this.alunos[i].id !== id) {
        novos.push(this.alunos[i]);
      }
    }
    this.alunos = novos;
  }

  // métodos para calcular as estatísticas do numero de alunos
  getNumAlunos(): number {
    return this.alunos.length;
  }

  // métodos para calcular as estatísticas das médias das idades
  getMediaIdades(): number {
    if (this.alunos.length === 0) return 0;
    let soma = 0;
    for (let i = 0; i < this.alunos.length; i++) soma += this.alunos[i].idade;
    return soma / this.alunos.length;
  }

  // métodos para calcular as estatísticas das médias das alturas
  getMediaAlturas(): number {
    if (this.alunos.length === 0) return 0;
    let soma = 0;
    for (let i = 0; i < this.alunos.length; i++) soma += this.alunos[i].altura;
    return soma / this.alunos.length;
  }

  // métodos para calcular as estatísticas das médias dos pesos
  getMediaPesos(): number {
    if (this.alunos.length === 0) return 0;
    let soma = 0;
    for (let i = 0; i < this.alunos.length; i++) soma += this.alunos[i].peso;
    return soma / this.alunos.length;
  }
}

// variáveis e seletores de elementos HTML
const turma = new Turma(1, "Educação Física"); // Instância da turma

const form = document.getElementById("alunoForm") as HTMLFormElement;
const tabelaAlunos = document.getElementById(
  "tabelaAlunos"
) as HTMLTableSectionElement;
const estatisticas = document.getElementById(
  "estatisticas"
) as HTMLParagraphElement;

// Evento de submissão do formulário
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const idField = document.getElementById("alunoId") as HTMLInputElement;
  const nomeField = document.getElementById("nome") as HTMLInputElement;
  const idadeField = document.getElementById("idade") as HTMLInputElement;
  const alturaField = document.getElementById("altura") as HTMLInputElement;
  const pesoField = document.getElementById("peso") as HTMLInputElement;

  // Validar campos
  const nome = nomeField.value;
  const idade = parseInt(idadeField.value);
  const altura = parseFloat(alturaField.value);
  const peso = parseFloat(pesoField.value);

  if (idField.value) {
    turma.editarAluno(parseInt(idField.value), { nome, idade, altura, peso });
  } else {
    const id = Date.now();
    turma.adicionarAluno(new Aluno(id, nome, idade, altura, peso));
  }

  form.reset();
  idField.value = "";
  atualizarTabela();
  atualizarEstatisticas();
});

// cada novo aluno é inserido na tabela
function atualizarTabela() {
  tabelaAlunos.innerHTML = "";
  for (let i = 0; i < turma.alunos.length; i++) {
    const aluno = turma.alunos[i];
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${aluno.nome}</td>
      <td>${aluno.idade}</td>
      <td>${aluno.altura.toFixed(2)}</td>
      <td>${aluno.peso.toFixed(1)}</td>
      <td>
        <button class="btn btn-sm btn-warning me-2" onclick="editar(${
          aluno.id
        })">Editar</button>
        <button class="btn btn-sm btn-danger" onclick="remover(${
          aluno.id
        })">Remover</button>
      </td>
    `;

    tabelaAlunos.appendChild(tr);
  }
}

// função que atualiza a tabela das estatísticas na página
function atualizarEstatisticas() {
  estatisticas.innerHTML = `
    Número de alunos: <b>${turma.getNumAlunos()}</b><br>
    Média de idades: <b>${turma.getMediaIdades().toFixed(1)}</b><br>
    Média de alturas: <b>${turma.getMediaAlturas().toFixed(2)}</b> m<br>
    Média de pesos: <b>${turma.getMediaPesos().toFixed(1)}</b> kg
  `;
}

// Tornar funções acessíveis no HTML
(window as any).editar = function (id: number) {
  let aluno: Aluno | null = null;
  for (let i = 0; i < turma.alunos.length; i++) {
    if (turma.alunos[i].id === id) {
      aluno = turma.alunos[i];
      break;
    }
  }

  if (aluno) {
    (document.getElementById("alunoId") as HTMLInputElement).value =
      aluno.id.toString();
    (document.getElementById("nome") as HTMLInputElement).value = aluno.nome;
    (document.getElementById("idade") as HTMLInputElement).value =
      aluno.idade.toString();
    (document.getElementById("altura") as HTMLInputElement).value =
      aluno.altura.toString();
    (document.getElementById("peso") as HTMLInputElement).value =
      aluno.peso.toString();
  }
};

// Função para remover aluno
(window as any).remover = function (id: number) {
  turma.removerAluno(id);
  atualizarTabela();
  atualizarEstatisticas();
};

// Inicializa estatísticas vazias
atualizarEstatisticas();
