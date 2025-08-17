import { faker } from '@faker-js/faker'
import logger from '../src/logger.js'
const joker = faker.lorem.word()
logger.error(joker)
logger.warn(joker)
logger.info(joker)
logger.http(joker)
logger.verbose(joker)
logger.debug(joker)
logger.silly(joker)
