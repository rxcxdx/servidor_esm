import { createLogger, transports, format } from 'winston'
import config from 'config'

const FILE_NAME = config.get('logConfig.filename')
const LEVEL = config.get('logConfig.level')
const SILENT_CONSOLE = config.get('logConfig.silentConsole')
const SILENT_FILE = config.get('logConfig.silentFile')

/*
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6
};
*/

// Se o arquivo não existe é criado
// Reiniciar o servidor não apaga o arquivo

const tipo1 = new transports.Console({
  silent: SILENT_CONSOLE,
  format: format.combine(format.colorize({ all: true }), format.simple())
})

const tipo2 = new transports.File({
  silent: SILENT_FILE,
  filename: FILE_NAME,
  format: format.combine(format.timestamp(), format.json())
})

export default createLogger({
  level: LEVEL,
  transports: [tipo1, tipo2]
})
