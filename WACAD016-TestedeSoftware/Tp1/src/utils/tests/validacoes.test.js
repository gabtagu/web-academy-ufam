const { primeiroNome } = require("../validacoes");

describe("primeiroNome", () => {
  test("Deve retornar o primeiro nome quando o nome completo tiver mais de um nome", () => {
    const nomeCompleto = "João Silva";
    const resultado = primeiroNome(nomeCompleto);
    expect(resultado).toBe("João");
  });
});
