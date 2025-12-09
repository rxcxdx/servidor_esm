import rcdmongo from './rcdmongo.js'

const { collection, db, client } = await rcdmongo()
const linhas = await collection.countDocuments()
console.log('linhas collection vendas=', linhas)
const estatistica = await db.stats()
console.log(estatistica)
await client.close()
