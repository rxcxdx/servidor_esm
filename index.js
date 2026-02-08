import config from 'config'
import express from 'express'
import morgan from 'morgan'
import * as z from 'zod'
import auth from 'basic-auth'
import assert from 'node:assert/strict'
import errorHandling from './src/errorHandling.js'
import { logger } from './src/logger.js'
import eagle from './src/eagle.js'
import flanker from './src/flanker.js'
import bear from './src/bear.js'
import { schemaVenda } from './src/schemas.js'
import { endPointItens, endPointVenda, endPointIndice, endPointRelatorio, endPointGrafico } from './src/endpoint.js'

const app = express()

app.use(express.json())

const isMorgan = config.get('isMorgan')

if (isMorgan) {
  app.use(morgan('tiny', { immediate: true }))
}

app.get('/ws/configuracao', (req, res) => {
  res.send(config)
})

app.put('/ws/produto', (req, res, next) => {
  const schema = z.object({
    id: z.uuidv4().optional(),
    descricao: z.string().min(1),
    valor: z.number().positive()
  })
  const o = schema.parse(req.body)
  eagle
    .upsertProduto(o)
    .then(() => res.end())
    .catch(next)
})

app.post('/ws/buy', (req, res, next) => {
  const o = schemaVenda.parse(req.body)
  flanker.gravarVenda(o)
    .then(() => res.send({ _id: o._id, dt: o.dt }))
    .catch(next)
})

app.get('/ws/produtos', (req, res, next) => {
  eagle.getProdutos()
    .then((docs) => {
      res.send(docs)
    })
    .catch(next)
})

app.get('/ws/produto', (req, res, next) => {
  eagle.getProduto(req.query.id)
    .then((o) => {
      res.send(o)
    })
    .catch(next)
})

app.delete('/ws/produto', (req, res, next) => {
  eagle.apagarProduto(req.query.id)
    .then(() => res.end())
    .catch(next)
})

app.delete('/ws/venda', (req, res, next) => {
  flanker.apagarVenda(req.query._id)
    .then(() => res.end())
    .catch(next)
})

app.get('/ws/login', (req, res) => {
  const credentials = auth(req)
  assert(credentials, 'credencial inválida')
  const o = bear.login(credentials)
  res.send(o)
})

app.post('/ws/relatorio', (req, res, next) => {
  endPointRelatorio(req.body)
    .then((doc) => res.send(doc))
    .catch(next)
})


app.get('/ws/itens', (req, res, next) => {
  endPointItens(req.query.isoDate)
    .then((docs) => res.send(docs))
    .catch(next)
})


app.get('/ws/indice', (req, res, next) => {
  endPointIndice(req.query.isoDate)
    .then((docs) => res.send(docs))
    .catch(next)
})

app.get('/ws/grafico', (req, res, next) => {
  endPointGrafico(req.query.isoMonth)
    .then((docs) => res.send(docs))
    .catch(next)
})


app.get('/ws/venda', (req, res, next) => {
  endPointVenda(req.query._id)
    .then((o) => res.send(o))
    .catch(next)
})

app.get('/ws/timeline', (req, res, next) => {
  flanker.getTimeline()
    .then((docs) => {
      res.send(docs)
    })
    .catch(next)
})

app.get('/ws/loja', (req, res, next) => {
  eagle.loja()
    .then((docs) => {
      res.send(docs)
    })
    .catch(next)
})

app.use((req, res) => {
  res.status(404).send('Not Found')
})

app.use(errorHandling)

const PORT = 8000

const HOSTNAME = 'localhost'

app.listen(PORT, HOSTNAME, () => {
  logger.info('ws ON')
})
