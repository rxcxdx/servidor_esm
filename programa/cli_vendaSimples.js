import vendaSimples from "../src/vendaSimples.js";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import util from "util";

const { venda } = yargs(hideBin(process.argv))
  .option("venda", { type: "string", demandOption: true })
  .parse();

const doc = await vendaSimples(venda);
console.log(util.inspect(doc, { depth: 0 }));
process.exit();
