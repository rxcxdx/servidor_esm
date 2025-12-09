import jsonfile from 'jsonfile'
import config from 'config'
import { logger } from './logger.js'

const file = config.get('userclientsFilename')

export default function buscarUserclients() {
  logger.info('leitura do arquivo userclients.json')
  return jsonfile.readFileSync(file)
}
