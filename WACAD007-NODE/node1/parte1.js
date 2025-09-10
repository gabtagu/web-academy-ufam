// importação dos módulos necessários
const http = require("http");
const fs = require("fs");
const path = require("path");

// recebe um diretório como argumento
const dir = process.argv[2];

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
server.listen(3333, () => {
  console.log("Servidor rodando em http://localhost:3333");
});
