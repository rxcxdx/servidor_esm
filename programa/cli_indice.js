import dayjs from "dayjs";
import indice from "../src/indice.js";
import util from "util";

const entrada = {
  gte: dayjs().startOf('d').format(),
  lte: dayjs().endOf('d').format()
};

try {
  const o = await indice(entrada);
  console.log(util.inspect(o, { depth: 0 }));
} catch (err) {
  console.log(err.message);
} finally {
  process.exit();
}
