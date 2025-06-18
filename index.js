import express from 'express'
import bearerToken from 'express-bearer-token'
import auth from 'basic-auth'
import morgan from 'morgan'
import dayjs from 'dayjs'
import { query, validationResult, matchedData } from 'express-validator'
import check from 'check-types'
import superErrorHandling from './src/superErrorHandling.js'
import indice from './src/indice.js'
import relatorioVendas from './src/relatorioVendas.js'
import relatorioBeans from './src/relatorioBeans.js'
import buy from './src/buy.js'
import criarDespesa from './src/criarDespesa.js'
import grafico from './src/grafico.js'
import apagarVendas from './src/apagarVendas.js'
import buildVenda from './src/buildVenda.js'
import {
  loja,
  produtos,
  produto,
  userclient,
  signin,
  grant
} from './src/crud.js'
import wsGravarProduto from './ws/wsGravarProduto.js'
import timeline from './src/timeline.js'
import wsAtualizarUserclient from './ws/wsAtualizarUserclient.js'
import wsSandbox from './ws/wsSandbox.js'

const app = express()
app.use(express.json())
app.use(bearerToken())
app.use(morgan('tiny'))

app.get('/ws/sandbox', wsSandbox)
app.post('/ws/gravar_produto', wsGravarProduto)
app.post('/ws/atualizar_userclient', wsAtualizarUserclient)

app.get(new RegExp('/ws/grant'), async (req, res) => {
  try {
    await grant(req.token)
    res.status(200).end()
  } catch {
    res.status(401).end()
  }
})

app.get('/ws/v1/signin', async (req, res) => {
  const entrada = auth(req)
  const o = await signin(entrada.name, entrada.pass)
  res.send(o)
})

app.post('/ws/v2/signin', async (req, res) => {
  const o = await signin(req.body.username, req.body.senha)
  res.send(o)
})

app.get('/ws/produtos', async (req, res) => {
  const docs = await produtos()
  res.send(docs)
})

app.get('/ws/loja', async (req, res) => {
  const docs = await loja()
  res.send(docs)
})

app.get('/ws/timeline', async (req, res) => {
  const docs = await timeline()
  res.send(docs)
})

app.get('/ws/produto/:id', async (req, res) => {
  const doc = await produto(req.params.id)
  res.send(doc)
})

app.get(
  '/ws/relatorio_beans',
  query('gte').isDate(),
  query('lte').isDate(),
  query('descricao').isString().trim().optional(),
  async (req, res) => {
    validationResult(req).throw()
    const data = matchedData(req)
    const formulario = {
      gte: dayjs(data.gte).startOf('d').toDate(),
      lte: dayjs(data.lte).endOf('d').toDate(),
      descricao: data.descricao
    }
    const doc = await relatorioBeans(formulario)
    res.send(doc)
  }
)

app.get(
  '/ws/indice',
  query('gte').isDate(),
  query('lte').isDate(),
  query('tamanhoCart').isInt().toInt().optional(),
  query('obsExiste').isBoolean().toBoolean().optional(),
  async (req, res) => {
    const result = validationResult(req)
    if (!result.isEmpty()) {
      throw new Error('indice entrada invalida express')
    }
    const data = matchedData(req)
    const formulario = {
      gte: dayjs(data.gte).startOf('d').toDate(),
      lte: dayjs(data.lte).endOf('d').toDate(),
      tamanhoCart: data.tamanhoCart,
      obsExiste: data.obsExiste
    }
    const doc = await indice(formulario)
    res.send(doc)
  }
)

app.get(
  '/ws/relatorio_vendas',
  query('gte').isDate(),
  query('lte').isDate(),
  query('username').isString().optional(),
  async (req, res) => {
    validationResult(req).throw()
    const data = matchedData(req)
    const formulario = {
      gte: dayjs(data.gte).startOf('d').toDate(),
      lte: dayjs(data.lte).endOf('d').toDate(),
      username: data.username
    }
    const doc = await relatorioVendas(formulario)
    res.send(doc)
  }
)

app.get('/ws/grafico', query('mes').isISO8601(), async (req, res) => {
  validationResult(req).throw()
  const { mes } = matchedData(req)
  const docs = await grafico(mes)
  res.send(docs)
})

app.get('/ws/venda/:vendaId', async (req, res) => {
  const doc = await buildVenda(req.params.vendaId)
  res.send(doc)
})

app.get('/ws/userclient/:id', async (req, res) => {
  const doc = await userclient(req.params.id)
  res.send(doc)
})

app.post('/ws/criar_despesa', async (req, res) => {
  await criarDespesa(req.body)
  res.end()
})

app.post('/ws/buy', async (req, res) => {
  const vendaId = await buy(req.body)
  res.send(vendaId)
})

app.post('/ws/apagar_vendas', async (req, res) => {
  check.assert.nonEmptyArray(req.body, 'nenhuma venda selecionada')
  await apagarVendas(req.body)
  res.end()
})

app.use((req, res) => {
  res.status(404).send({ message: null, name: 'Not Found' })
})

app.use(superErrorHandling)

const PORT = 8000
const HOSTNAME = 'localhost'

app.listen(PORT, HOSTNAME, () => {
  console.log('servidor web START')
  console.log('http://' + HOSTNAME + ':' + PORT)
})