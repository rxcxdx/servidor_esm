import rcdmongo from './rcdmongo.js'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers';

const { collection, client } = await rcdmongo()
const argv = yargs(hideBin(process.argv))
  .demandOption('identifier')
  .string('identifier')
  .parse()
const filtro = { 
  cart: { $elemMatch: { identifier: argv.identifier }}
}
const modificar = {
  $pull: { cart: { identifier: argv.identifier } }
}
await collection.updateOne(filtro, modificar)
await client.close()
