import db from "../src/conn.js";
import dayjs from "dayjs";
import check from "check-types";
import chalk from "chalk";

const OPT = {
  sort: [["dt", -1]],
  projection: { _id: true, dt: true, obs: true },
};

export default async function indice({gte, lte, tamanho, obsExiste}) {
  const filtro = {
    dt: {
      $gte: gte,
      $lte: lte,
    },
  };
  if (check.number(tamanho)) {    
    console.log(chalk.cyan('FILTREI tamanho'))
    Object.assign(filtro, { cart: { '$size': tamanho } })
  }
  if (obsExiste === true) {    
    console.log(chalk.cyan('FILTREI obsExiste'))
    Object.assign(filtro, { obs: { $exists: true } } )
  }
  const collection = db.collection("vendas");
  const vendas = await collection.find(filtro, OPT).toArray();
  return {
    inicio: dayjs(gte).format(),
    fim: dayjs(lte).format(),
    quantVendas: vendas.length,
    vendas
  }
} 

