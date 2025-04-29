import indice from "../src/indice.js";
import dayjs from "dayjs";
import util from "util";

const o = await indice(dayjs(), dayjs())
console.log(util.inspect(o, { depth: 0 }));
process.exit()