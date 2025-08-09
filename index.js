import express from 'express'
import config from 'config'
import bearerToken from 'express-bearer-token'
import morgan from 'morgan'
import logger from './src/logger.js'
import superErrorHandling from './src/superErrorHandling.js'
import {
  produto,
  categorias,
  loja,
  gravarProduto,
  produtosIndice
} from './src/eagle.js'
import relatorio from './src/relatorio.js'
import { param, body, validationResult, matchedData } from 'express-validator'
import itens from './src/itens.js'
import grafico from './src/grafico.js'
import {
  timeline,
  findIndice,
  apagar,
  findGrafico,
  findRelatorio,
  findCart,
  findVenda,
  inserirDoc
} from './src/flanker.js'
import { schemaProduto } from './src/schemas.js'
import { buildBuy } from './src/buildBuy.js'

const isMorgan = config.get('isMorgan')

const app = express()
app.use(express.json())
app.use(bearerToken())

if (isMorgan) {
  app.use(morgan('tiny'))
}

app.get('/ws/grafico/:mes', param('mes').isISO8601(), async (req, res) => {
  validationResult(req).throw()
  const data = matchedData(req)
  const docs = await findGrafico(data.mes)
  res.send(grafico(docs))
})

app.get('/ws/indice/:dia', param('dia').isISO8601(), async (req, res) => {
  validationResult(req).throw()
  const data = matchedData(req)
  const indice = await findIndice(data.dia)
  res.send(indice)
})

app.get('/ws/itens/:dia', param('dia').isISO8601(), async (req, res) => {
  validationResult(req).throw()
  const data = matchedData(req)
  const cart = await findCart(data.dia)
  res.send(itens(cart))
})

app.post(
  '/ws/relatorio',
  body('gte').isISO8601(),
  body('lte').isISO8601(),
  body('username').isString().optional(),
  async (req, res) => {
    const result = validationResult(req)
    if (!result.isEmpty()) {
      logger.error('entrada do ws relatorio é inválida')
      res.status(500).end()
      return
    }
    const data = matchedData(req)
    const docs = await findRelatorio(data.gte, data.lte, data.username)
    res.send(relatorio(docs))
  }
)

app.post('/ws/gravar_produto', async (req, res) => {
  try {
    const o = schemaProduto.validateSync(req.body, { stripUnknown: true })
    await gravarProduto(o)
    res.end()
  } catch (e) {
    res.status(500).send({ message: e.message })
  }
})

app.get('/ws/produtos', async (req, res) => {
  const docs = await produtosIndice()
  res.send(docs)
})

app.get('/ws/timeline', async (req, res) => {
  const docs = await timeline()
  res.send(docs)
})

app.get('/ws/categorias', async (req, res) => {
  const docs = await categorias()
  res.send(docs)
})

app.get('/ws/produto/:id', async (req, res) => {
  try {
    const o = await produto(req.params.id)
    res.send(o)
  } catch (e) {
    logger.error(e.name)
    res.status(500).end()
  }
})

app.post('/ws/buy', async (req, res) => {
  try {
    const o = buildBuy(req.body)
    const insertedId = await inserirDoc(o)
    res.send(insertedId)
  } catch (e) {
    res.status(500).send({ message: e.message, name: e.name })
  }
})

app.get('/ws/loja', async (req, res) => {
  const docs = await loja()
  res.send(docs)
})

app.get('/ws/venda/:vendaId', async (req, res) => {
  try {
    const o = await findVenda(req.params.vendaId)
    res.send(o)
  } catch (e) {
    res.status(500).send({ message: e.message })
  }
})

app.get('/ws/apagar/:vendaId', async (req, res) => {
  try {
    await apagar(req.params.vendaId)
    res.end()
  } catch (e) {
    logger.error(e.message)
    res.status(500).end()
  }
})

app.use((req, res) => {
  res.status(404).end()
})

app.use(superErrorHandling)

const PORT = 8000
const HOSTNAME = 'localhost'

app.listen(PORT, HOSTNAME, () => {
  logger.debug('http://' + HOSTNAME + ':' + PORT)
})
