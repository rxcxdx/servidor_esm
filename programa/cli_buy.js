import buy from "../src/buy.js";

const entrada = {
  username: "bruce",
  cart: [{ descricao: "agua", quantidade: 1, valor: 1 }],
};
const { _id } = await buy(entrada);
console.log(_id);
process.exit();
