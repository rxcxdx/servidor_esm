import rcdmongo from './rcdmongo.js'
import check from 'check-types'
import { every, shuffle } from 'lodash-es'

// every não executa tudo!

const { collection, client } = await rcdmongo()
const vendas = await collection.find({}).toArray()
await client.close()
const flag = every(shuffle(vendas), (o) => {
  return check.date(o.dt)
  // return o.cart.length > 0
})
console.log('Lista de vendas é válida?', flag)
