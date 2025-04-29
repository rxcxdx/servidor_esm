import { input } from "@inquirer/prompts";
import { MongoClient } from "mongodb";
import check from "check-types";

const client = new MongoClient('mongodb://localhost:27017');
await client.connect();
const collection = client.db('app_database').collection("vendas");
const _id = await input({ message: "Enter your _id", required: true });
const identifier = await input({
  message: "Enter your identifier",
  required: true,
});
const filtro = {
  _id,
  cart: { $not: { $size: 1 } },
};
const { modifiedCount } = await collection.updateOne(filtro, {
  $pull: { cart: { identifier } },
});
check.assert(modifiedCount, "nada foi apagado");
await client.close()
