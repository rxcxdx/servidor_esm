import relatorioVendas from "../src/relatorioVendas.js";
import dayjs from "dayjs";
import util from "util";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const { dia } = yargs(hideBin(process.argv))
  .option("dia", { type: "string", demandOption: true })
  .parse();

const o = await relatorioVendas(dayjs(dia))
console.log(util.inspect(o, { depth: 0 }));
process.exit()