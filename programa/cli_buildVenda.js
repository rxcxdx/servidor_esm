import buildVenda from "../src/buildVenda.js";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import util from "util";

const { id } = yargs(hideBin(process.argv))
  .option("id", { type: "string", demandOption: true })
  .parse();

const doc = await buildVenda(id);

console.log(util.inspect(doc, { depth: 0 }));

process.exit();
