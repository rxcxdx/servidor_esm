import { input } from "@inquirer/prompts";
import { MongoClient } from "mongodb";
import check from "check-types";

const client = new MongoClient("mongodb://localhost:27017");
try {
  await client.connect();
  const collection = client.db("app_database").collection("vendas");
  const _id = await input({ message: "Enter your _id", required: true });
  const filtro = { _id };
  const { deletedCount } = await collection.deleteOne(filtro);
  check.assert(deletedCount, "nada foi apagado");
} catch (err) {
  console.log(err.message);
} finally {
  await client.close();
}
