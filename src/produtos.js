import express from 'express'
import {
  apagarProduto,
  buscarProdutos,
  buscarProduto,
  gravarProduto
} from './eagle.js'

const router = express.Router()

router.get('/', (req, res, next) => {
  buscarProdutos()
    .then((docs) => {
      res.send(docs)
    })
    .catch(next)
})

router.put('/', (req, res) => {
  gravarProduto(req.body)
    .then(() => {
      res.end()
    })
    .catch((e) => {
      res.status(500).send({ message: e.message })
    })
})

router.get('/:id', (req, res, next) => {
  buscarProduto(req.params.id)
    .then((o) => {
      res.send(o)
    })
    .catch(next)
})

router.delete('/:produtoId', (req, res, next) => {
  apagarProduto(req.params.produtoId)
    .then(() => {
      res.end()
    })
    .catch(next)
})

export default router
