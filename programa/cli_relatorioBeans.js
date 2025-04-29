import relatorioBeans from "../src/relatorioBeans.js";
import dayjs from "dayjs";
import util from "util";

const o = await relatorioBeans(dayjs())
console.log(util.inspect(o, { depth: 2 }));
process.exit()