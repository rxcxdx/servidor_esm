import assert from 'node:assert/strict'
import { find, pick } from 'lodash-es'
import jsonfile from 'jsonfile'
import config from 'config'
import { logger } from './logger.js'

const file = config.get('userclientsFilename')

function buscarUserclients() {
  logger.debug('leitura do arquivo userclients.json')
  return jsonfile.readFileSync(file)
}

function login(credentials) {
  const userclients = buscarUserclients()
  const doc = find(userclients, { username: credentials.name })
  assert(doc, 'userclient não encontrado')
  assert(credentials.pass === doc.password, 'senha errada')
  return pick(doc, ['username', 'adm'])
}

export default {
  login
}
