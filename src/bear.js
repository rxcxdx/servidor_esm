import { find } from 'lodash-es'
import jsonfile from 'jsonfile'
import config from 'config'
import { logger } from './logger.js'
import assert from 'node:assert/strict'

const file = config.get('userclientsFilename')

function buscarUserclients() {
  logger.info('leitura do arquivo userclients.json')
  return jsonfile.readFileSync(file)
}

export function grant(token) {
  const userclients = buscarUserclients()
  const doc = find(userclients, { token })
  assert(doc)
}

export function login(username, senha) {
  const userclients = buscarUserclients()
  const doc = find(userclients, { username })
  assert(doc, 'userclient não encontrado')
  assert(senha === doc.senha, 'senha errada')
  return doc
}
