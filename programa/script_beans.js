import Table from "cli-table3";
import { MongoClient } from "mongodb";
const client = new MongoClient('mongodb://localhost:27017');
await client.connect();
const collection = client.db('app_database').collection("vendas");
const OPTIONS = {
  sort: [["dt", -1]],
  limit: 8,
};
const docs = await collection.find({}, OPTIONS).toArray();
const joker = docs.flatMap((o) => o.cart);
console.log('linhas=',joker.length)
const table = new Table({ head: ["identifier", 'valor', "descricao"] });
joker.forEach((o) => {
  table.push([o.identifier, o.valor, o.descricao]);
});
console.log(table.toString());
await client.close()
