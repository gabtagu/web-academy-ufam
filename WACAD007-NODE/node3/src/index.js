import fsPromise from "fs/promises";
import http from "http";
import dotenv from "dotenv";
import template from "./lib/template.js";
import gerarLorem from "./lib/loren.js";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const PORT = process.env.PORT ?? 5000;

const server = http.createServer(async (req, res) => {
  let p = 0;
  if (req.url.includes("p=")) {
    const valor = parseInt(req.url.split("p=")[1]);
    if (!isNaN(valor)) p = valor;
  }

  if (req.url === "/public/style.css") {
    const css = await fsPromise.readFile("./public/css/style.css");
    res.writeHead(200, { "Content-Type": "text/css; charset=utf-8" });
    res.write(css);
    res.end();
    return;
  }

  const lorem = gerarLorem(p);
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.write(template(`<p>Valor de p:  ${p} </p> <br> ${lorem}`));
  res.end();
});

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});
