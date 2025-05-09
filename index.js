import express from "express";
import cors from "cors";
import morgan from "morgan";
import superErrorHandling from "./src/superErrorHandling.js";
import cvendas from "./src/cvendas.js";
import { loja, produtos, produto, gravarProduto } from "./src/modulo_produto.js";
import indice from "./src/indice.js";
import vendaSimples from "./src/vendaSimples.js";
import vendaCompleta from "./src/vendaCompleta.js";
import relatorioVendas from "./src/relatorioVendas.js";
import relatorioBeans from "./src/relatorioBeans.js";
import apagar from "./src/apagar.js";
import buy from "./src/buy.js";
import graficoDias from "./src/graficoDias.js";

import categorias from "./src/categorias.js";
import { criarDespesa } from "./src/criarDespesa.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

app.post("/ws/c_vendas", (req, res, next) => {
  cvendas(req.body)
    .then((docs) => res.send(docs))
    .catch(next);
});

app.post("/ws/criarDespesa", (req, res, next) => {
  criarDespesa(req.body)
    .then(() => res.end())
    .catch(next);
});

app.get("/ws/v1/produtos", (req, res, next) => {
  produtos()
    .then((docs) => res.send(docs))
    .catch(next);
});

app.get("/ws/loja", (req, res, next) => {
  loja()
    .then((docs) => res.send(docs))
    .catch(next);
});

app.get("/ws/produto/:id", (req, res, next) => {
  produto(req.params.id)
    .then((doc) => res.send(doc))
    .catch(next);
});

app.get("/ws/categorias", (req, res, next) => {
  categorias()
    .then((docs) => res.send(docs))
    .catch(next);
});

app.get("/ws/indice", (req, res, next) => {
  indice(req.query)
    .then((docs) => res.send(docs))
    .catch(next);
});

app.get("/ws/venda_simples/:vendaId", (req, res, next) => {
  vendaSimples(req.params.vendaId)
    .then((doc) => res.send(doc))
    .catch(next);
});

app.get("/ws/venda_completa/:vendaId", (req, res, next) => {
  vendaCompleta(req.params.vendaId)
    .then((doc) => res.send(doc))
    .catch(next);
});

app.post("/ws/apagar", (req, res, next) => {
  apagar(req.body)
    .then(() => res.end())
    .catch(next);
});

app.post("/ws/relatorio_beans", (req, res, next) => {
  relatorioBeans(req.body)
    .then((doc) => res.send(doc))
    .catch(next);
});

app.post("/ws/gravar_produto", (req, res, next) => {
  gravarProduto(req.body)
    .then(() => res.end())
    .catch(next);
});

app.post("/ws/relatorio_vendas", (req, res, next) => {
  relatorioVendas(req.body)
    .then((doc) => res.send(doc))
    .catch(next);
});

app.post("/ws/buy", (req, res, next) => {
  buy(req.body)
    .then((doc) =>
      res.send({
        _id: doc._id,
      })
    )
    .catch(next);
});

app.get("/ws/grafico_dias", (req, res, next) => {
  graficoDias(req.query.mes)
    .then((doc) => res.send(doc))
    .catch(next);
});


app.use((req, res) => {
  res.status(404).end();
});

app.use(superErrorHandling);

app.listen({ host: "localhost", port: 8000 });
