import relatorioVendas from "../src/relatorioVendas.js";
import dayjs from "dayjs";
import util from "util";

const formulario = {
  gte: dayjs().startOf("d").toDate(),
  lte: dayjs().endOf("d").toDate(),
  // username: null,
};

const o = await relatorioVendas(formulario);

console.log(util.inspect(o, { depth: 0 }));

process.exit();
