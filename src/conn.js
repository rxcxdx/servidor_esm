import { MongoClient } from "mongodb";
import config from "config";

const URL = config.get("dbConfig.url");
const DBNAME = config.get("dbConfig.dbName");

const client = new MongoClient(URL, { serverSelectionTimeoutMS: 3000 });

let conn;
try {
  conn = await client.connect();
  console.log("cliente do mongo conectado no servidor");
} catch (e) {
  console.log(e);
  process.exit();
}
const db = conn.db(DBNAME);
export default db;
