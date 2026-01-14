import rcdmongo from './rcdmongo.js'
import { shuffle } from 'lodash-es'
import vigilancia from './vigilancia.js'

const { collection, client } = await rcdmongo()
const vendas = await collection.find({}).toArray()
await client.close()
const cart = vendas.flatMap((o) => o.cart)
const flag = vigilancia(shuffle(cart))
console.log('Lista é válida?', flag)

