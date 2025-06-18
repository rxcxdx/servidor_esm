import { nanoid } from 'nanoid'
import logger from '../src/logger.js'

export default async function wsSandbox(req, res) {
  logger.error(nanoid())
  logger.warn(nanoid())
  logger.info(nanoid())
  res.end()
}