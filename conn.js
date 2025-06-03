import { MongoClient } from "mongodb";
import config from "config";
import logger from "./logger.js";

const URL = config.get("dbConfig.url");
const DBNAME = config.get("dbConfig.dbName");

const client = new MongoClient(URL, { serverSelectionTimeoutMS: 3000 });

let conn;
try {
  conn = await client.connect();
  console.log
  logger.debug("cliente do mongo conectado no servidor");
} catch {
  logger.error("cliente do mongo NÃO conectado no servidor ERRO FATAL")
  process.exit();
}
const db = conn.db(DBNAME);
export default db;
