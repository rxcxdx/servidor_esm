import db from './conn.js'
import dayjs from 'dayjs'
import buildGrafico from './buildGrafico.js'
import logger from './logger.js'

export default async function grafico(entrada) {
  const joker = dayjs(entrada)
  logger.info(joker.format('MMM/YYYY'))
  const match = {
    dt: {
      $gte: joker.startOf('month').toDate(),
      $lte: joker.endOf('month').toDate()
    }
  }
  const collection = db.collection('vendas')
  const vendas = await collection.find(match).toArray()
  vendas.forEach((o) => {
    o.dia = dayjs(o.dt).format('DD')
  })
  return buildGrafico(vendas)
}
