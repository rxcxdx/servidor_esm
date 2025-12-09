import config from 'config'
import express from 'express'
import bearerToken from 'express-bearer-token'
import morgan from 'morgan'
import errorHandling from './src/error-handling.js'
import { logger } from './src/logger.js'
import birds from './src/rota-birds.js'
import { buscarCategorias, loja, gravarProduto } from './src/eagle.js'
import grant from './src/grant.js'
import venda from './src/venda.js'
import { getTimeline, gravarVenda } from './src/flanker.js'
import itens from './src/itens.js'
import relatorio from './src/relatorio.js'
import graficoDias from './src/graficoDias.js'
import graficoUsernames from './src/graficoUsernames.js'
import indice from './src/indice.js'
import { buscarProdutos, getProduto } from './src/eagle.js'
import check from 'check-types'
import { assertIsoMonth } from './src/utils.js'
import login from './src/login.js'

const app = express()

app.use(express.json())
app.use(bearerToken())

const isMorgan = config.get('isMorgan')

if (isMorgan) {
  app.use(morgan('tiny'))
}

app.get('/ws/grafico_dias/:mes', (req, res) => {
  assertIsoMonth(req.params.mes)
  graficoDias(req.params.mes)
    .then((doc) => {
      res.send(doc)
    })
    .catch(() => {
      res.status(500).end()
    })
})

app.get('/ws/grafico_usernames/:dia', (req, res) => {
  graficoUsernames(req.params.dia)
    .then((doc) => {
      res.send(doc)
    })
    .catch(() => {
      res.status(500).end()
    })
})

app.get('/ws/indice/:dia', (req, res) => {
  indice(req.params.dia)
    .then((doc) => {
      res.send(doc)
    })
    .catch(() => {
      res.status(500).end()
    })
})

app.get('/ws/grant', (req, res) => {
  grant(req.token)
    .then(() => {
      res.status(200).end()
    })
    .catch(() => {
      res.status(401).end()
    })
})

app.get('/ws/login', (req, res) => {
  login(req)
    .then((o) => {
      res.send(o)
    })
    .catch(() => {
      res.status(500).end()
    })
})

app.get('/ws/itens/:dia', (req, res) => {
  itens(req.params.dia)
    .then((doc) => {
      res.send(doc)
    })
    .catch(() => {
      res.status(500).end()
    })
})

app.post('/ws/relatorio', (req, res) => {
  check.assert.object(req.body)
  relatorio(req.body)
    .then((doc) => {
      res.send(doc)
    })
    .catch(() => {
      res.status(500).end()
    })
})

app.get('/ws/timeline', (req, res) => {
  getTimeline()
    .then((docs) => {
      res.send(docs)
    })
    .catch(() => {
      res.status(500).end()
    })
})

app.post('/ws/buy', (req, res) => {
  check.assert.object(req.body)
  gravarVenda(req.body)
    .then((doc) => {
      res.send(doc)
    })
    .catch((e) => {
      res.status(500).send({ message: e.message })
    })
})

app.get('/ws/loja', (req, res) => {
  loja()
    .then((docs) => {
      res.send(docs)
    })
    .catch(() => {
      res.status(500).end()
    })
})

app.get('/ws/vendas/:vendaId', (req, res) => {
  venda(req.params.vendaId)
    .then((o) => {
      res.send(o)
    })
    .catch((e) => {
      res.status(500).send({ message: e.message })
    })
})

app.get('/ws/produtos', (req, res) => {
  buscarProdutos()
    .then((docs) => {
      res.send(docs)
    })
    .catch(() => {
      res.status(500).end()
    })
})

app.get('/ws/categorias', (req, res) => {
  buscarCategorias()
    .then((docs) => {
      res.send(docs)
    })
    .catch(() => {
      res.status(500).end()
    })
})

app.put('/ws/produtos', (req, res) => {
  check.assert.object(req.body)
  gravarProduto(req.body)
    .then(() => {
      res.end()
    })
    .catch((e) => {
      res.status(500).send({ message: e.message })
    })
})

app.get('/ws/produtos/:id', (req, res) => {
  getProduto(req.params.id)
    .then((o) => {
      res.send(o)
    })
    .catch(() => {
      res.status(500).end()
    })
})

app.use('/ws/birds', birds)

app.use((req, res) => {
  res.status(404).end()
})

app.use(errorHandling)

const PORT = 8000
const HOSTNAME = 'localhost'

app.listen(PORT, HOSTNAME, () => {
  logger.info('ws ON')
})
