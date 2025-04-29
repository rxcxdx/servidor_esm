import { ascending } from "d3-array";
import intl from "../intl.js";
import { groupBy, forEach } from "lodash-es";

export default function buildGraficoHoras(vendas) {
  vendas.forEach((o) => {
    o.hora = intl.formatTime(o.dt, { hour: "2-digit" });
  });
  const grupo = groupBy(vendas, "hora");
  const resposta = [];
  forEach(grupo, (arr, k) => {
    resposta.push({ x: k, y: arr.length });
  });
  resposta.sort((a, b) => ascending(a.x, b.x));
  return resposta;
}
