import { MongoClient } from "mongodb";
import { confirm } from "@inquirer/prompts";
import check from "check-types";

const client = new MongoClient('mongodb://localhost:27017');
await client.connect();
const collection = client.db('app_database').collection("vendas");
const answer = await confirm({ message: "Confirme reset para vendas" });
check.assert(answer, 'NÃO CONFIRMADO')
await collection.deleteMany({});
await client.close()
