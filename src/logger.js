import { createLogger, transports, format } from 'winston'
import config from 'config'

const FILENAME = config.get('logConfig.filename')
const LEVEL = config.get('logConfig.level')
const silentConsole = config.get('logConfig.silentConsole')
const silentFile = config.get('logConfig.silentFile')

/*
  error: 0
  warn: 1
  info: 2
  http: 3
  verbose: 4
  debug: 5
  silly: 6
*/

// Se o arquivo não existe é criado
// Reiniciar o servidor não apaga o arquivo

const a = new transports.Console({
  format: format.combine(format.colorize(), format.simple()),
  silent: silentConsole
})

const b = new transports.File({
  filename: FILENAME,
  format: format.combine(format.timestamp(), format.json()),
  level: 'error',
  silent: silentFile
})

const TRANSPORTS = [a, b]

export const logger = createLogger({
  level: LEVEL,
  transports: TRANSPORTS
})
