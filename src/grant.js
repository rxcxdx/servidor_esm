import buscarUserclients from './buscarUserclients.js'
import { find } from 'lodash-es'
import check from 'check-types'

export default async function grant(token) {
  const userclients = buscarUserclients()
  const o = find(userclients, { token })
  check.assert(o, 'userclient não existe')
}
