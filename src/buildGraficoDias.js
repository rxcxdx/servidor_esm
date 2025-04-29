import { ascending } from "d3-array";
import intl from "../intl.js";
import { groupBy, forEach } from "lodash-es";

export default function buildGraficoDias(vendas) {
  vendas.forEach((o) => {
    o.dia = intl.formatDate(o.dt, { day: "2-digit" });
  });
  const grupo = groupBy(vendas, "dia");
  const resposta = [];
  forEach(grupo, (arr, k) => {
    resposta.push({ x: k, y: arr.length });
  });
  resposta.sort((a, b) => ascending(a.x, b.x));
  return resposta;
}
