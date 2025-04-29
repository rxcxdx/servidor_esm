import { find } from "lodash-es";
import buildGraficoHoras from "../src/buildGraficoHoras.js";
import check from "check-types";

const vendasMock = [
  { dt: "2025-02-05T01:00:00-03:00" },
  { dt: "2025-02-05T01:30:00-03:00" },
  { dt: "2025-02-05T03:00:00-03:00" },
];
const lista = buildGraficoHoras(vendasMock);
const alvo = find(lista, { x: '01'});
check.assert.equal(2, alvo.y);
