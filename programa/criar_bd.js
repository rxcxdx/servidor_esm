import { sequeConexao } from '../src/eagle.js'

// se o arquivo não existe é criado
await sequeConexao.sync()
console.log('successfully')
