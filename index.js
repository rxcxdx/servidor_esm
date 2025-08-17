import express from 'express'
import createError from 'http-errors'
import config from 'config'
import bearerToken from 'express-bearer-token'
import morgan from 'morgan'
import logger from './src/logger.js'
import superErrorHandling from './src/superErrorHandling.js'
import relatorio from './src/relatorio.js'
import { param, body, validationResult, matchedData } from 'express-validator'
import itens from './src/itens.js'
import grafico from './src/grafico.js'
import {
  timeline,
  findIndice,
  apagarVenda,
  findGrafico,
  findRelatorio,
  findCart,
  findVenda,
  inserirDoc
} from './src/flanker.js'

import {
  produtos,
  loja,
  atualizarProduto,
  produto,
  apagarProduto
} from './src/eagle2.js'
import check from 'check-types'

const isMorgan = config.get('isMorgan')

const app = express()
app.use(express.json())
app.use(bearerToken())

if (isMorgan) {
  app.use(morgan('tiny'))
}

app.get('/ws/grafico/:mes', param('mes').isISO8601(), (req, res, next) => {
  validationResult(req).throw()
  const data = matchedData(req)
  findGrafico(data.mes)
    .then((docs) => {
      const arr = grafico(docs)
      res.send(arr)
    })
    .catch(next)
})

app.get('/ws/indice/:dia', param('dia').isISO8601(), (req, res, next) => {
  validationResult(req).throw()
  const data = matchedData(req)
  findIndice(data.dia)
    .then((docs) => {
      res.send(docs)
    })
    .catch(next)
})

app.get('/ws/itens/:dia', param('dia').isISO8601(), (req, res, next) => {
  validationResult(req).throw()
  const data = matchedData(req)
  findCart(data.dia)
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
    findRelatorio(formulario)
      .then((registros) => {
        const o = relatorio(registros)
        res.send(o)
      })
      .catch(next)
  }
)

app.post('/ws/gravar_produto', (req, res) => {
  atualizarProduto(req.body)
    .then(() => {
      res.end()
    })
    .catch((e) => {
      res.status(500).send(createError(500, e.message))
    })
})

app.get('/ws/produtos', (req, res, next) => {
  produtos()
    .then((docs) => {
      res.send(docs)
    })
    .catch(next)
})

app.get('/ws/timeline', (req, res, next) => {
  timeline()
    .then((docs) => {
      res.send(docs)
    })
    .catch(next)
})

app.get('/ws/produto/:id', (req,res,next) => {
  produto(req.params.id)
    .then((o) => {
      check.assert.object(o)
      res.send(o)
    })
    .catch(next)
})

app.post('/ws/buy', (req, res) => {
  inserirDoc(req.body)
    .then((insertedId) => {
      res.send(insertedId)
    })
    .catch((e) => {
      res.status(500).send(createError(500, e.message))
    })
})

app.get('/ws/loja', (req, res, next) => {
  loja()
    .then((docs) => {
      res.send(docs)
    })
    .catch(next)
})

app.get('/ws/venda/:vendaId', (req, res) => {
  findVenda(req.params.vendaId)
    .then((o) => {
      res.send(o)
    })
    .catch((e) => {
      res.status(500).send(createError(500, e.message))
    })
})

app.delete('/ws/venda/:vendaId', (req, res) => {
  apagarVenda(req.params.vendaId)
    .then(() => {
      res.end()
    })
    .catch((e) => {
      res.status(500).send(createError(500, e.message))
    })
})
app.delete('/ws/produto/:produtoId', (req, res) => {
  apagarProduto(req.params.produtoId)
    .then(() => {
      res.end()
    })
    .catch((e) => {
      res.status(500).send(createError(500, e.message))
    })
})

app.use((req, res) => {
  res.status(404).send(createError(404))
})

app.use(superErrorHandling)

const PORT = 8000
const HOSTNAME = 'localhost'

app.listen(PORT, HOSTNAME, () => {
  logger.silly('http://' + HOSTNAME + ':' + PORT)
})
