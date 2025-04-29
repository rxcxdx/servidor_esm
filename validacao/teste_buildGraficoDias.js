import buildGraficoDias from "../src/buildGraficoDias.js";
import check from "check-types";
import { find } from "lodash-es";

const vendasMock = [
  { dt: "2025-02-05T00:00:00-03:00" },
  { dt: "2025-02-05T00:00:00-03:00" },
  { dt: "2025-02-05T00:00:00-03:00" },
  { dt: "2025-02-01T00:00:00-03:00" },
];
const lista = buildGraficoDias(vendasMock);
const alvo = find(lista, { x: '05'});
check.assert.equal(3, alvo.y);