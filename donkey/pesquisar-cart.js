/*
import conexao from "./conexao.js";
import { input } from '@inquirer/prompts'
import { MongoClient } from 'mongodb'
const client = new MongoClient('mongodb://localhost:27017')
await client.connect()
const collection = client.db('app_database').collection('vendas')
const entrada = await input({
  message: 'descricao, exata',
  required: true
})
const filtro = {
  cart: { $elemMatch: { descricao: entrada } }
}
const rs = await collection.countDocuments(filtro)
console.log('count:', rs)
await client.close()
*/
