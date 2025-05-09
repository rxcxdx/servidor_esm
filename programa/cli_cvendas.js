import cvendas from "../src/cvendas.js";

const entrada = {
  tamanho: 1
};

const docs = await cvendas(entrada);
console.log(docs.length);
process.exit(1);

