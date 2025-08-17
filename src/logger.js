import { createLogger, transports, format } from 'winston'
import config from 'config'

const FILENAME = config.get('logConfig.filename')
const SILENT = config.get('logConfig.silent')
const LEVEL = config.get('logConfig.level')

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

// se o arquivo não existe é criado
// reiniciar o servidor não apaga o arquivo

export default createLogger({
  silent: SILENT,
  level: LEVEL,
  transports: [
    new transports.Console({
      format: format.combine(format.simple(), format.colorize({ all: true }))
    }),
    new transports.File({
      filename: FILENAME
    })
  ]
})
