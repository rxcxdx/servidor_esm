import buscarUserclients from './buscarUserclients.js'
import auth from 'basic-auth'
import { find } from 'lodash-es'
import check from 'check-types'

export default async function login(req) {
  const credentials = auth(req)
  const userclients = buscarUserclients()
  const o = find(userclients, {
    username: credentials.name,
    senha: credentials.pass
  })
  check.assert(o, 'userclient não existe')
  return o
}
