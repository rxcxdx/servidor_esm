/*eslint no-unused-vars: 'off'*/
import { logger } from './logger.js'

export default function errorHandling(error, req, res, next) {
  logger.info('errorHandling')
  res.status(500).send({ message: error.message })
}
