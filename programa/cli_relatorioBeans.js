import relatorioBeans from "../src/relatorioBeans.js";
import dayjs from "dayjs";
import util from "util";

const dto = {
  gte: dayjs().startOf("d").toDate(),
  lte: dayjs().endOf("d").toDate(),
  descricao: ''
};
const o = await relatorioBeans(dto);
console.log(util.inspect(o, { depth: 2 }));
process.exit();
