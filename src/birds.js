import express from 'express'
import { nanoid } from 'nanoid'
import config from 'config'
import dayjs from 'dayjs'

const router = express.Router()

router.get('/sandbox', (req, res) => {
  res.send({
    message: nanoid()
  })
})

router.get('/configuracao', (req, res) => {
  const dto = {
    $NODE_ENV: process.env.NODE_ENV,
    $NODE_CONFIG_DIR: process.env.NODE_CONFIG_DIR,
    $TZ: process.env.TZ
  }
  const o = {
    ...config,
    ...dto,
    atual: dayjs().format('DD/MM/YYYY HH:mm:ss.SSS Z')
  }
  res.send(o)
})

export default router
