import express from "express";
import cors from "cors";
import morgan from "morgan";
import dayjs from "dayjs";
import { query, validationResult, matchedData } from "express-validator";
import check from "check-types";
import superErrorHandling from "./superErrorHandling.js";
import indice from "./src/indice.js";
import relatorioVendas from "./src/relatorioVendas.js";
import relatorioBeans from "./src/relatorioBeans.js";
import buy from "./src/buy.js";
import upsertProduto from "./src/upsertProduto.js";
import criarDespesa from "./src/criarDespesa.js";
import grafico from "./src/grafico.js";
import apagarVendas from "./src/apagarVendas.js";
import criarEstoque from "./src/criarEstoque.js";
import buildVenda from "./src/buildVenda.js";
import atualizarUserclient from "./src/atualizarUserclient.js";
import { loja, produtos, produto, userclient } from "./crud.js";
import wsUserclients from "./ws/wsUserclients.js";
import wsAmbiente from "./ws/wsAmbiente.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

app.get("/ws/userclients", wsUserclients);
app.get("/ws/ambiente", wsAmbiente);

app.get("/ws/produtos", async (req, res) => {
  const docs = await produtos();
  res.send(docs);
});

app.get("/ws/loja", async (req, res) => {
  const docs = await loja();
  res.send(docs);
});

app.get("/ws/produto/:id", async (req, res) => {
  const doc = await produto(req.params.id);
  res.send(doc);
});

app.get(
  "/ws/relatorio_beans",
  query("gte").isDate(),
  query("lte").isDate(),
  query("descricao").isString().trim().optional(),
  async (req, res) => {
    validationResult(req).throw();
    const data = matchedData(req);
    const formulario = {
      gte: dayjs(data.gte).startOf("d").toDate(),
      lte: dayjs(data.lte).endOf("d").toDate(),
      descricao: data.descricao,
    };
    const doc = await relatorioBeans(formulario);
    res.send(doc);
  }
);





app.get(
  "/ws/indice",
  query("gte").isDate(),
  query("lte").isDate(),
  query("tamanhoCart").isInt().toInt().optional(),
  query("obsExiste").isBoolean().toBoolean().optional(),
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      throw new Error("indice entrada invalida express");
    }
    const data = matchedData(req);
    const formulario = {
      gte: dayjs(data.gte).startOf("d").toDate(),
      lte: dayjs(data.lte).endOf("d").toDate(),
      tamanhoCart: data.tamanhoCart,
      obsExiste: data.obsExiste,
    };
    const doc = await indice(formulario);
    res.send(doc);
  }
);






app.get(
  "/ws/relatorio_vendas",
  query("gte").isDate(),
  query("lte").isDate(),
  query("username").isString().optional(),
  async (req, res) => {
    validationResult(req).throw();
    const data = matchedData(req);
    const formulario = {
      gte: dayjs(data.gte).startOf("d").toDate(),
      lte: dayjs(data.lte).endOf("d").toDate(),
      username: data.username,
    };
    const doc = await relatorioVendas(formulario);
    res.send(doc);
  }
);

app.get("/ws/grafico", query("mes").isISO8601(), async (req, res) => {
  validationResult(req).throw();
  const { mes } = matchedData(req);
  const doc = await grafico(mes);
  res.send(doc);
});

app.get("/ws/venda/:vendaId", async (req, res) => {
  const doc = await buildVenda(req.params.vendaId);
  res.send(doc);
});

app.post("/ws/upsert_produto", async (req, res) => {
  await upsertProduto(req.body);
  res.end();
});

app.get("/ws/userclient/:id", async (req, res) => {
  const doc = await userclient(req.params.id);
  res.send(doc);
});

app.post("/ws/atualizar_userclient", async (req, res) => {
  await atualizarUserclient(req.body);
  res.end();
});

app.post("/ws/criar_despesa", async (req, res) => {
  await criarDespesa(req.body);
  res.end();
});

app.post("/ws/criar_estoque", async (req, res) => {
  await criarEstoque(req.body);
  res.end();
});

app.post("/ws/buy", async (req, res) => {
  const vendaId = await buy(req.body);
  res.send(vendaId);
});

app.post("/ws/apagar_vendas", async (req, res) => {
  check.assert.nonEmptyArray(req.body, "nenhuma venda selecionada");
  await apagarVendas(req.body);
  res.end();
});

app.get("/ws/grant", (req, res) => {
  const joker = req.query.access_token;
  joker === "abcdef" ? res.status(200).end() : res.status(401).end();
});

app.use((req, res) => {
  res.status(404).send({ message: null, name: "Not Found" });
});

app.use(superErrorHandling);

app.listen({ host: "localhost", port: 8000 });
