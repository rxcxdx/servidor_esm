import { sequeConexao } from "../eagle.js"
await sequeConexao.sync({ force: true })
console.log('synchronized successfully, dados apagados')