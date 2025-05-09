import buildGraficoDias2 from "./buildGraficoDias2.js";

// é grana

const vendas = [
  { dia: "19", cart: [{ quantidade: 1, valor: 1 }] },
  { dia: "7", cart: [{ quantidade: 1, valor: 10 }] },
  { dia: "7", cart: [{ quantidade: 1, valor: 10.12 }] },
  { dia: "2", cart: [{ quantidade: 1, valor: 1 }] },
  { dia: "1", cart: [{ quantidade: 1, valor: 1 }] },
  { dia: "28", cart: [{ quantidade: 1, valor: 1 }] },
];

console.log(buildGraficoDias2(vendas))