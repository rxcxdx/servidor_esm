import db from './conn.js'
import dayjs from 'dayjs'
import buildGrafico from './buildGrafico.js'
import logger from './logger.js'

export default async function grafico(entrada) {
  const foo = dayjs(entrada)
  logger.info(foo.format('MMM/YYYY'))
  const match = {
    dt: {
      $gte: foo.startOf('month').toDate(),
      $lte: foo.endOf('month').toDate()
    }
  }
  const collection = db.collection('vendas')
  const docs = await collection.find(match).toArray()
  docs.forEach((o) => {
    o.dia = dayjs(o.dt).format('DD')
  })
  return buildGrafico(docs)
}
