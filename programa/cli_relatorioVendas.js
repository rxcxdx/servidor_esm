import relatorioVendas from "../src/relatorioVendas.js";
import dayjs from "dayjs";
import util from "util";

var gte = dayjs().startOf('d').toDate()
var lte = dayjs().endOf('d').toDate()
var username = undefined

const o = await relatorioVendas(gte, lte, username)

console.log(util.inspect(o, { depth: 0 }));
process.exit()
