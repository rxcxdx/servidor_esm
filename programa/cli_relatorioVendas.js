import relatorioVendas from "../src/relatorioVendas.js";
import dayjs from "dayjs";
import util from "util";

const entrada = {
  gte: dayjs().startOf('d').format(),
  lte: dayjs().endOf('d').format()
};

const o = await relatorioVendas(entrada)
console.log(util.inspect(o, { depth: 0 }));
process.exit()