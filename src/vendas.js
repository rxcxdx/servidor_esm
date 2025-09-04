import express from 'express'
import { apagarVenda,buscarVenda } from './flanker.js'
import logger from './logger.js'

const router = express.Router()

router.delete('/:vendaId', (req, res, next) => {
  apagarVenda(req.params.vendaId)
    .then(() => {
      res.end()
    })
    .catch(next)
})

router.get('/:vendaId', (req, res) => {
  buscarVenda(req.params.vendaId)
    .then((o) => {
      res.send(o)
    })
    .catch((e) => {
      logger.error(e.message)
      res.status(500).send({ message: e.message })
    })
})

export default router
