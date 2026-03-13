import { confirm } from '@inquirer/prompts'
import rcdmongo from './rcdmongo.js'

const { collection, client } = await rcdmongo()
const filtro = {}
const answer = await confirm({ message: 'Continue?', default: false })
if (answer) {
  await collection.deleteMany(filtro)
}
await client.close()
