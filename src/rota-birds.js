import express from 'express'
import config from 'config'
import { defaultTo } from 'lodash-es'
import kindOf from 'kind-of'

const router = express.Router()

router.post('/sandbox', (req, res) => {
  console.log('###', kindOf(req.body))
  res.end()
})

router.get('/configuracao', (req, res) => {
  res.send(config)
})

router.get('/ambiente', (req, res) => {
  res.send({
    PATH: process.env.PATH,
    TZ: process.env.TZ,
    NODE_ENV: process.env.NODE_ENV,
    NODE_CONFIG_DIR: process.env.NODE_CONFIG_DIR,
    PALMEIRAS: defaultTo(process.env.PALMEIRAS, null)
  })
})

export default router
