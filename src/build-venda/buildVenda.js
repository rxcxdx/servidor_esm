import { nanoid } from 'nanoid'
import { sumBy } from 'lodash-es'
import { schemaVenda } from '../schemas.js'
import { somarCart } from '../matematica.js'
// import { logger } from '../logger.js'

export default function buildVenda(entrada) {
  const novo = schemaVenda.parse(entrada)
  // logger.debug('buildVenda')
  novo._id = nanoid()
  novo.dt = new Date()
  novo.itens = sumBy(novo.cart, 'quantidade')
  novo.total = somarCart(novo.cart)
  /*
  novo.cart.forEach((o) => {
    o.subtotal = calcSubtotalItem(o)
  })
  */
  return novo
}
