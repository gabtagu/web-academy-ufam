// importação dos módulos necessários
const http = require("http");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const { createLink } = require("./util");

// recebe um diretório como argumento
const dir = process.argv[2];

// verifica se o diretório foi fornecido
const PORT = process.env.PORT || 3333;

const server = http.createServer((req, res) => {
  // Se for a raiz, lista os arquivos
  if (req.url === "/") {
    fs.readdir(dir, (err, files) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Erro ao ler o diretório");
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      files.forEach((file) => {
        res.write(createLink(file));
      });
      res.end();
    });
  } else {
    // Serve o conteúdo do arquivo solicitado
    const filePath = path.join(dir, req.url.slice(1));
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Arquivo não encontrado");
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.write('<a href="/">Voltar</a><br><br>');
      res.end(data);
    });
  }
});

// inicia o servidor na porta 3333
server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

const env = process.env.NODE_ENV || "development";
require("dotenv").config({ path: `.env.${env}` });
