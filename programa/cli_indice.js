import indice from '../src/indice.js'
import dayjs from 'dayjs'
//import util from 'util'

try {
  const formulario = {
    gte: dayjs().startOf('d').toDate(),
    lte: dayjs().endOf('d').toDate()
    // tamanhoCart: null,
    // obsExiste: null
  }
  const docs = await indice(formulario)
  console.log(docs.length)
  // console.log(util.inspect(o, { depth: 2 }))
} catch (err) {
  console.log(err.message)
} finally {
  process.exit()
}
