import config from 'config'
import express from 'express'
import morgan from 'morgan'
import errorHandling from './src/errorHandling.js'
import { logger } from './src/logger.js'
import { loja, getProdutos, getProduto, apagarProduto } from './src/eagle.js'
import {
  endPointGrafico,
  endPointRelatorio,
  endPointIndice,
  endPointBuildVenda,
  endPointBuy,
  endPointUpsertProduto,
  endPointTimeline,
  endPointItens,
  endPointApagar,
  endPointLogin,
  endPointGrant
} from './src/endpoint.js'

const app = express()

app.use(express.json())

const isMorgan = config.get('isMorgan')

if (isMorgan) {
  app.use(morgan('tiny', { immediate: true }))
}

app.get('/ws/grafico', (req, res, next) => {
  endPointGrafico(req.query.isoMonth)
    .then((docs) => res.send(docs))
    .catch(next)
})

app.get('/ws/indice', (req, res, next) => {
  endPointIndice(req.query)
    .then((docs) => {
      res.send(docs)
    })
    .catch(next)
})

app.get('/ws/itens', (req, res, next) => {
  endPointItens(req.query)
    .then((docs) => {
      res.send(docs)
    })
    .catch(next)
})

app.get('/ws/grant', (req, res) => {
  endPointGrant(req.query.access_token)
    .then(() => {
      res.status(200).end()
    })
    .catch(() => {
      res.status(401).end()
    })
})

app.get('/ws/login', (req, res, next) => {
  endPointLogin(req)
    .then((o) => res.send(o))
    .catch(next)
})

app.post('/ws/relatorio', (req, res, next) => {
  endPointRelatorio(req.body)
    .then((doc) => res.send(doc))
    .catch(next)
})

app.post('/ws/apagar', (req, res, next) => {
  endPointApagar(req.body)
    .then(() => res.end())
    .catch(next)
})

app.get('/ws/timeline', (req, res, next) => {
  endPointTimeline()
    .then((docs) => {
      res.send(docs)
    })
    .catch(next)
})

app.post('/ws/buy', (req, res, next) => {
  endPointBuy(req.body)
    .then((o) => {
      res.send(o)
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

app.get('/ws/build_venda', (req, res, next) => {
  endPointBuildVenda(req.query.vendaId)
    .then((o) => res.send(o))
    .catch(next)
})

app.get('/ws/produtos', (req, res, next) => {
  getProdutos()
    .then((docs) => {
      res.send(docs)
    })
    .catch(next)
})

app.put('/ws/produto', (req, res, next) => {
  endPointUpsertProduto(req.body)
    .then(() => {
      res.end()
    })
    .catch(next)
})

app.get('/ws/produto', (req, res, next) => {
  getProduto(req.query.id)
    .then((o) => {
      res.send(o)
    })
    .catch(next)
})

app.delete('/ws/produto', (req, res, next) => {
  apagarProduto(req.query.id)
    .then(() => {
      res.end()
    })
    .catch(next)
})

app.get('/ws/sandbox', (req, res) => {
  console.log('#', req.token)
  res.end()
})

app.use((req, res) => {
  res.status(404).end()
})

app.use(errorHandling)

const PORT = 8000
const HOSTNAME = 'localhost'

app.listen(PORT, HOSTNAME, () => {
  logger.info('ws ON')
})
