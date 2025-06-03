import relatorioBeans from "../src/relatorioBeans.js";
import util from "util";
import dayjs from "dayjs";

const formulario = {
  gte: dayjs().startOf("d").toDate(),
  lte: dayjs().endOf("d").toDate(),
  // descricao: null,
};

const o = await relatorioBeans(formulario);
console.log(util.inspect(o, { depth: 0 }));
process.exit();
