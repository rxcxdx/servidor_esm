import db from "../src/conn.js";
import dayjs from "dayjs";
import { reduzirVendas } from "../matematica.js";
import check from "check-types";
import chalk from "chalk";

export default async function relatorioVendas(gte, lte, username) {
  const filtro = {
    dt: {
      $gte: gte,
      $lte: lte,
    },
  };
  if (check.nonEmptyString(username)) {    
    console.log(chalk.cyan('FILTREI username'))
    Object.assign(filtro, { username: username })
  }
  const collection = db.collection("vendas");
  const vendas = await collection.find(filtro).toArray();
  return {
    ...reduzirVendas(vendas),
    inicio: dayjs(gte).format(),
    fim: dayjs(lte).format(),
  };
}
