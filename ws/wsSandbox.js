import logger from '../src/logger.js'
import { faker } from '@faker-js/faker'

export default async function wsSandbox(req, res) {
  const v = faker.lorem.words({ min: 10, max: 15})
  logger.error(v)
  logger.warn(v)
  logger.info(v)
  res.end()
}