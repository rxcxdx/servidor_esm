import { userclients } from "../crud.js";
import logger from "../logger.js";
import cache from "../cache.js";

export default async function (req, res) {
  if (cache.has("userclients")) {
    return res.send(cache.get("userclients"))
  }
  logger.debug('pegar userclients do bd!')
  const docs = await userclients()
  cache.set("userclients", docs);
  res.send(docs)
}
