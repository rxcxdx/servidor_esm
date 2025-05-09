import collect from "collect.js";
import { calcSubtotalBean } from "../matematica.js";

export default function buildGraficoDias(vendas) {
  return collect(vendas)
    .groupBy("dia")
    .map((c) => c.flatMap((o) => o.cart).sum(calcSubtotalBean))
    .all();
}
