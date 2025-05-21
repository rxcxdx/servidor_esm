import indice from "../src/indice.js";
import dayjs from "dayjs";
import util from "util";

const formulario = {
  gte: dayjs().startOf("d").toDate(),
  lte: dayjs().endOf("d").toDate(),
  tamanho: undefined,
  // obsExiste: true
};

try {
  const o = await indice(formulario);
  console.log(util.inspect(o, { depth: 0 }));
} catch (err) {
  console.log(err.message);
} finally {
  process.exit();
}
