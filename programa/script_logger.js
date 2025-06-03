import logger from "../logger.js";
import { faker } from "@faker-js/faker";

logger.error(faker.lorem.word());
logger.warn(faker.lorem.word());
logger.info(faker.lorem.word());
logger.http(faker.lorem.word());
logger.verbose(faker.lorem.word());
logger.debug(faker.lorem.word());
logger.silly(faker.lorem.word());
