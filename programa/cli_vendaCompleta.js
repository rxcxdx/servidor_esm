import vendaCompleta from "../src/vendaCompleta.js";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import util from "util";

const { venda } = yargs(hideBin(process.argv))
  .option("venda", { type: "string", demandOption: true })
  .parse();

const doc = await vendaCompleta(venda);
console.log(util.inspect(doc, { depth: 0 }));
process.exit();
