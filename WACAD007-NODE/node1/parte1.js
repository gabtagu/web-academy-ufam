// importação dos módulos necessários
const http = require("http");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

// recebe um diretório como argumento
const dir = process.argv[2];

// verifica se o diretório foi fornecido
const PORT = process.env.PORT || 3333;

const server = http.createServer((req, res) => {
  fs.readdir(dir, (err, files) => {
    if (err) {
      // Se ocorrer um erro, envie uma resposta de erro
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Erro ao ler o diretório");
      return;
    }

    // Envia a lista de arquivos como uma resposta HTML
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<ul>");
    files.forEach((file) => {
      res.write(`<li>${file}</li>`);
    });
    res.write("</ul>");
    res.end();
  });
});

// inicia o servidor na porta 3333
server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

const env = process.env.NODE_ENV || "development";
require("dotenv").config({ path: `.env.${env}` });
