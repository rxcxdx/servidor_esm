import rcdmongo from './rcdmongo.js'
import { every, shuffle } from 'lodash-es'
import check from 'check-types'
// import { BigNumber } from 'bignumber.js'

// every não executa tudo!

const { collection, client } = await rcdmongo()
const vendas = await collection.find({}).toArray()
await client.close()
const cart = vendas.flatMap((o) => o.cart)
const flag = every(shuffle(cart), (o) => {
  // return new BigNumber(o.valor).decimalPlaces() <= 2 ? true : false
  return check.string(o.obs)
})
console.log('Lista de itens é válida?', flag)
await client.close()
