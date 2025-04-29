import { Despesa } from "../eagle.js";
import { Op } from "sequelize";
import { assertDayjs } from "../utils.js";

// entrada é mes como dayjs
export default async function despesas(a) {
  assertDayjs(a);
  const gte = a.startOf("month").toDate();
  const lte = a.endOf("month").toDate();
  const options = {
    order: [["dt", "DESC"]],
    where: { dt: { [Op.gte]: gte, [Op.lte]: lte } },
  };
  const modelos = await Despesa.findAll(options);
  return modelos.map((o) => o.toJSON());
}
