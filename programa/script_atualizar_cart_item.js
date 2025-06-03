import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");
await client.connect();
const collection = client.db("app_database").collection("vendas");

const filtro = {
  _id: "7pVcWArzB7lb7yCCSnXMa",
  cart: { $elemMatch: { identifier: "IoZ22OP3WVn2Rzv8TthfH" } },
};

const rs = await collection.updateOne(filtro, {
  $set: { "cart.$.quantidade": 4 },
});

console.log("count:", rs);

await client.close();
