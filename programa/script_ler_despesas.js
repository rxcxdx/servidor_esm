import Table from "cli-table3";
import dayjs from "dayjs";
import { Despesa } from "../eagle.js";
import { Op } from "sequelize";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const { mes } = yargs(hideBin(process.argv))
  .option("mes", { type: "string", demandOption: true })
  .parse();
const joker = dayjs(mes);
const gte = joker.startOf("month");
const lte = joker.endOf("month");
const options = {
  order: [["dt", "ASC"]],
  where: { dt: { [Op.gte]: gte.toDate(), [Op.lte]: lte.toDate() } },
};
const modelos = await Despesa.findAll(options);
console.log(joker.format("MMMM YYYY"));
console.log("linhas:", modelos.length);
const table = new Table({ head: ["descricao", 'valor', "dt"] });
modelos.forEach((o) => {
  table.push([o.descricao, o.valor, o.dt.toISOString()]);
});
console.log(table.toString());
