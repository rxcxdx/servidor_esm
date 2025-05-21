import express from "express";
import cors from "cors";
import morgan from "morgan";
import superErrorHandling from "./src/superErrorHandling.js";
import { query, validationResult, matchedData } from "express-validator";
import dayjs from "dayjs";
import indice from "./src/indice.js";
import vendaCompleta from "./src/vendaCompleta.js";
import relatorioVendas from "./src/relatorioVendas.js";
import relatorioBeans from "./src/relatorioBeans.js";
import buy from "./src/buy.js";
import gravarProduto from "./src/gravarProduto.js";
import atualizarUserclient from "./src/atualizarUserclient.js";
import criarDespesa from "./src/criarDespesa.js";
import { userclient, userclients } from "./src/modulo_userclients.js";
import { loja, produtos, produto } from "./src/modulo_produtos.js";
import grafico from "./src/grafico.js";
import apagarVendas from "./src/apagarVendas.js";
import check from "check-types";

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

app.get("/ws/v1/produtos", (req, res, next) => {
  produtos()
    .then((docs) => res.send(docs))
    .catch(next);
});

app.get("/ws/userclients", (req, res, next) => {
  userclients()
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

app.get("/ws/userclient/:id", (req, res, next) => {
  userclient(req.params.id)
    .then((doc) => res.send(doc))
    .catch(next);
});

app.get(
  "/ws/relatorio_beans",
  query("gte").isDate(),
  query("lte").isDate(),
  query("descricao").isString().optional(),
  (req, res, next) => {
    validationResult(req).throw();
    const data = matchedData(req);

    const formulario = {
      gte: dayjs(data.gte).startOf("d").toDate(),
      lte: dayjs(data.lte).endOf("d").toDate(),
      descricao: data.descricao,
    };

    relatorioBeans(formulario)
      .then((doc) => res.send(doc))
      .catch(next);
  }
);

app.get(
  "/ws/indice",
  query("gte").isDate(),
  query("lte").isDate(),
  query("tamanho").isInt().toInt().optional(),
  query("obsExiste").isBoolean().toBoolean().optional(),
  (req, res, next) => {
    validationResult(req).throw();
    const data = matchedData(req);

    const formulario = {
      gte: dayjs(data.gte).startOf("d").toDate(),
      lte: dayjs(data.lte).endOf("d").toDate(),
      tamanho: data.tamanho,
      obsExiste: data.obsExiste,
    };

    indice(formulario)
      .then((doc) => res.send(doc))
      .catch(next);
  }
);

app.get(
  "/ws/relatorio_vendas",
  query("gte").isDate(),
  query("lte").isDate(),
  query("username").isString().optional(),
  (req, res, next) => {
    validationResult(req).throw();
    const data = matchedData(req);
    const gte = dayjs(data.gte).startOf("d").toDate();
    const lte = dayjs(data.lte).endOf("d").toDate();
    relatorioVendas(gte, lte, data.username)
      .then((doc) => res.send(doc))
      .catch(next);
  }
);

app.get("/ws/grafico", query("mes").isISO8601(), (req, res, next) => {
  validationResult(req).throw();
  const { mes } = matchedData(req);
  grafico(mes)
    .then((doc) => res.send(doc))
    .catch(next);
});

app.get("/ws/venda_completa/:vendaId", (req, res, next) => {
  vendaCompleta(req.params.vendaId)
    .then((doc) => res.send(doc))
    .catch(next);
});

app.post("/ws/gravar_produto", (req, res, next) => {
  gravarProduto(req.body)
    .then(() => res.end())
    .catch(next);
});

app.post("/ws/atualizar_userclient", (req, res, next) => {
  atualizarUserclient(req.body)
    .then(() => res.end())
    .catch(next);
});

app.post("/ws/criar_despesa", (req, res, next) => {
  criarDespesa(req.body)
    .then(() => res.end())
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

app.post("/ws/apagar_vendas", (req, res, next) => {
  check.assert.nonEmptyArray(req.body, "nenhuma venda selecionada");
  apagarVendas(req.body)
    .then(() => res.end())
    .catch(next);
});

app.use((req, res) => {
  res.status(404).end();
});

app.use(superErrorHandling);

app.listen({ host: "localhost", port: 8000 });
