import express from 'express'
import { grant, signin } from './eagle.js'
import auth from 'basic-auth'

const router = express.Router()

router.get('/grant', (req, res) => {
  grant(req.token)
    .then(() => {
      res.status(200).end()
    })
    .catch(() => {
      res.status(401).end()
    })
})

router.post('/signin', (req, res, next) => {
  signin(req.body.username, req.body.password)
    .then((o) => {
      res.send(o)
    })
    .catch(next)
})

router.get('/signin', (req, res, next) => {
  const entrada = auth(req)
  signin(entrada.name, entrada.pass)
    .then((o) => {
      res.send(o)
    })
    .catch(next)
})

router.get('/atalho', (req, res, next) => {
  signin(req.query.username, req.query.password)
    .then((o) => {
      res.redirect('/?access_token=' + o.access_token)
    })
    .catch(next)
})

export default router
