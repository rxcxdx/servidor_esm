import { Produto, Userclient } from './eagle.js'
import check from 'check-types'

export async function produto(id) {
  const doc = await Produto.findByPk(id, { raw: true })
  check.assert(doc, 'produto nao existe')
  return doc
}

export async function produtos() {
  const docs = await Produto.findAll({
    attributes: ['id', 'descricao'],
    order: [['descricao', 'ASC']],
    raw: true
  })
  return docs
}

export async function loja() {
  const docs = await Produto.findAll({
    order: [['descricao', 'ASC']],
    raw: true
  })
  return docs
}

export async function userclient(id) {
  const modelo = await Userclient.findByPk(id)
  check.assert(modelo, 'userclient nao existe')
  return modelo.toJSON()
}

export async function signin(username, senha) {
  const modelo = await Userclient.findOne({
    where: { username, senha, liberado: true },
    attributes: ['username', 'access_token']
  })
  check.assert(modelo, 'userclient inválido')
  return modelo.toJSON()
}

export async function grant(token) {
  const modelo = await Userclient.findOne({
    where: { access_token: token, liberado: true }
  })
  check.assert(modelo, 'userclient inválido')
}
