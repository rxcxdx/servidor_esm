import check from "check-types";
import { MongoClient } from "mongodb";
const client = new MongoClient('mongodb://localhost:27017');
await client.connect();
const collection = client.db('app_database').collection("vendas");
const pattern = 'B'
check.assert.string(pattern)
const filtro = {
  obs: { $regex: pattern, $options: "i" }
}
console.log('pesquisar com regex o campo obs de uma venda!')
console.log('pattern=', pattern)
const docs = await collection.find(filtro).toArray();
console.log("length=", docs.length);
docs.forEach((o) => {
  console.log(o.obs)
});
await client.close()
