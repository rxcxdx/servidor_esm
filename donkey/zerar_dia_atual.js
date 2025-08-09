/*
import conexao from "./conexao.js";
import dayjs from 'dayjs'
const collection = await conexao()
const filtro = {
  dt: {
    $gte: dayjs().startOf('d').toDate(),
    $lte: dayjs().endOf('d').toDate()
  }
}
await collection.deleteMany(filtro)
process.exit()
*/