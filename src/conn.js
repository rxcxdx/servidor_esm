import { MongoClient } from "mongodb";
import config from 'config'
import { consola } from "consola"

const URL = config.get('dbConfig.url')
const DBNAME = config.get('dbConfig.dbName')
const client = new MongoClient(URL);
let conn;
try {
  conn = await client.connect();
  consola.info('cliente do mongo conectado no servidor');
} catch (e) {
  consola.error(e);
  process.exit()
}
const db = conn.db(DBNAME);
export default db;
