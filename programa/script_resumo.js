import { MongoClient } from "mongodb";
import intl from "../intl.js";

const client = new MongoClient('mongodb://localhost:27017');
await client.connect();
const collection = client.db('app_database').collection("vendas");

const rs1 = await collection.countDocuments({});
console.log("linhas", rs1);

/*
const rs2 = await collection.countDocuments({ cart: { $size: 0 } });
console.log("cartInvalido", rs2);
*/

/*
const rs3 = await collection.countDocuments({
  cart: { $elemMatch: { valor: { $lte: 0 } } },
});
console.log("beanInvalido", rs3);
*/

/*
const rs4 = await collection.countDocuments({
  _id: { $not: { $type: "string" } },
});
console.log("_id não é string?", rs4);
*/

/*
const rs5 = await collection.countDocuments({obs: { $exists: true }})
console.log("existe observação", rs5);
*/

const doc1 = await collection.findOne({}, { sort: [["dt", 1]] });
console.log("inicio", intl.formatDate(doc1.dt));

const doc2 = await collection.findOne({}, { sort: [["dt", -1]] });
console.log("fim", intl.formatDate(doc2.dt))

await client.close()

/*
const filtro = {
  cart: { $size: formulario.tamanho },
  obs: { $exists: formulario.exists }
};
*/