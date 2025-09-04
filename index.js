import express from 'express'
import bearerToken from 'express-bearer-token'
import { param, body, validationResult, matchedData } from 'express-validator'
import morgan from 'morgan'
import dayjs from 'dayjs'
import config from 'config'
import logger from './src/logger.js'
import errorHandling from './src/error-handling.js'
import relatorio from './src/relatorio.js'
import itens from './src/itens.js'
import grafico from './src/grafico.js'
import birds from './src/birds.js'
import login from './src/login.js'
import produtos from './src/produtos.js'
import vendas from './src/vendas.js'
import { loja, buscarUserclients } from './src/eagle.js'
import {
  buscarTimeline,
  buscarIndice,
  buscarGrafico,
  buscarRelatorio,
  buscarCart,
  inserirDoc
} from './src/flanker.js'
import construirVenda from './src/construir-venda.js'

const app = express()

app.use(express.json())
app.use(bearerToken())

const isMorgan = config.get('isMorgan')

if (isMorgan) {
  app.use(morgan('tiny'))
}

app.get('/ws/grafico/:mes', param('mes').isISO8601(), (req, res, next) => {
  validationResult(req).throw()
  const data = matchedData(req)
  buscarGrafico(data.mes)
    .then((registros) => {
      const docs = grafico(registros)
      res.send({
        docs,
        linhas: docs.length,
        descricao: dayjs(data.mes).format('MMMM')
      })
    })
    .catch(next)
})

app.get('/ws/indice/:dia', param('dia').isISO8601(), (req, res, next) => {
  validationResult(req).throw()
  const data = matchedData(req)
  buscarIndice(data.dia)
    .then((docs) => {
      res.send(docs)
    })
    .catch(next)
})

app.get('/ws/itens/:dia', param('dia').isISO8601(), (req, res, next) => {
  validationResult(req).throw()
  const data = matchedData(req)
  buscarCart(data.dia)
    .then((cart) => {
      const docs = itens(cart)
      res.send(docs)
    })
    .catch(next)
})

app.post(
  '/ws/relatorio',
  body('gte').isISO8601(),
  body('lte').isISO8601(),
  body('username').isString().optional(),
  (req, res, next) => {
    validationResult(req).throw()
    const formulario = matchedData(req)
    buscarRelatorio(formulario)
      .then((registros) => {
        const o = relatorio(registros)
        res.send(o)
      })
      .catch(next)
  }
)

app.get('/ws/timeline', (req, res, next) => {
  buscarTimeline()
    .then((docs) => {
      res.send(docs)
    })
    .catch(next)
})

app.post('/ws/buy', (req, res, next) => {
  let o
  try {
    o = construirVenda(req.body)
  } catch (e) {
    res.status(500).send({ message: e.message })
    return
  }
  inserirDoc(o)
    .then(() => {
      res.send({ _id: o._id, total: o.total })
    })
    .catch(next)
})

app.get('/ws/loja', (req, res, next) => {
  loja()
    .then((docs) => {
      res.send(docs)
    })
    .catch(next)
})

app.get('/ws/userclients', (req, res, next) => {
  buscarUserclients()
    .then((docs) => {
      res.send(docs)
    })
    .catch(next)
})

app.use('/ws/vendas', vendas)

app.use('/ws/produtos', produtos)

app.use('/ws/login', login)

app.use('/ws/birds', birds)

app.use((req, res) => {
  res.sendStatus(404)
})

app.use(errorHandling)

const PORT = 8000
const HOSTNAME = 'localhost'

app.listen(PORT, HOSTNAME, () => {
  logger.info('http://' + HOSTNAME + ':' + PORT)
})
