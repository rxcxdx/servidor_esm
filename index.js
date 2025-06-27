import express from 'express'
import config from 'config'
import yup from 'yup'
import bearerToken from 'express-bearer-token'
import auth from 'basic-auth'
import morgan from 'morgan'
import dayjs from 'dayjs'
import check from 'check-types'
import logger from './src/logger.js'
import superErrorHandling from './src/superErrorHandling.js'
import indice from './src/indice.js'
import relatorioVendas from './src/relatorioVendas.js'
import relatorioBeans from './src/relatorioBeans.js'
import buy from './src/buy.js'
import criarDespesa from './src/criarDespesa.js'
import grafico from './src/grafico.js'
import apagarVendas from './src/apagarVendas.js'
import {
  loja,
  produtos,
  produto,
  userclient,
  signin,
  grant
} from './src/crud.js'
import timeline from './src/timeline.js'
import wsSandbox from './ws/wsSandbox.js'
import atualizarUserclient from './src/atualizarUserclient.js'
import upsertProduto from './src/upsertProduto.js'
import wsVenda from './ws/wsVenda.js'

const isMorgan = config.get('isMorgan')

const app = express()
app.use(express.json())
app.use(bearerToken())

if (isMorgan) {
  app.use(morgan('tiny'))
  logger.info('morgan ON')
}

app.get('/ws/sandbox', wsSandbox)

app.post('/ws/upsert_produto', async (req, res) => {
  await upsertProduto(req.body)
  res.end()
})

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

app.post('/ws/relatorio_beans', async (req, res) => {
    const schema = yup.object({
      gte: yup.date().required(),
      lte: yup.date().required(),
      descricao: yup.string()
    })
    const data = await schema.validate(req.body)
    const formulario = {
      gte: dayjs(data.gte).startOf('d').toDate(),
      lte: dayjs(data.lte).endOf('d').toDate(),
      descricao: data.descricao
    }
    const o = await relatorioBeans(formulario)
    res.send(o)
  }
)

app.post('/ws/indice', async (req, res) => {
  const schema = yup.object({
    gte: yup.date().required(),
    lte: yup.date().required(),
    tamanhoCart: yup.number().integer().min(0),
    obsExiste: yup.bool()
  })
  const data = await schema.validate(req.body)
  const formulario = {
    gte: dayjs(data.gte).startOf('d').toDate(),
    lte: dayjs(data.lte).endOf('d').toDate(),
    tamanhoCart: data.tamanhoCart,
    obsExiste: data.obsExiste
  }
  const doc = await indice(formulario)
  res.send(doc)
})

app.post('/ws/relatorio_vendas', async (req, res) => {
    const schema = yup.object({
      gte: yup.date().required(),
      lte: yup.date().required(),
      username: yup.string()
    })
    const data = await schema.validate(req.body)
    const formulario = {
      gte: dayjs(data.gte).startOf('d').toDate(),
      lte: dayjs(data.lte).endOf('d').toDate(),
      username: data.username
    }
    const o = await relatorioVendas(formulario)
    res.send(o)
  }
)

app.get('/ws/grafico', async (req, res) => {
  const docs = await grafico(req.query.mes)
  res.send(docs)
})

app.get('/ws/venda/:vendaId', wsVenda)

app.get('/ws/userclient/:id', async (req, res) => {
  const doc = await userclient(req.params.id)
  res.send(doc)
})

app.post('/ws/criar_despesa', async (req, res) => {
  await criarDespesa(req.body)
  res.end()
})

app.post('/ws/atualizar_userclient', async (req, res) => {
  await atualizarUserclient(req.body)
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
  logger.info('http://' + HOSTNAME + ':' + PORT)
})