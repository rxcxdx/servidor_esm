import { Sequelize, DataTypes } from 'sequelize'
import config from 'config'
import assert from 'node:assert/strict'

const STORAGE = config.get('eagle')

const CONFIG_GLOBAL = {
  freezeTableName: true
}

function conversor(modelos) {
  return modelos.map(o => o.toJSON())
}

const sequeConexao = new Sequelize({
  dialect: 'sqlite',
  storage: STORAGE,
  logging: undefined,
  define: CONFIG_GLOBAL
})

const Produto = sequeConexao.define('produtos', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false
  },
  descricao: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  valor: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  atalho: {
    type: DataTypes.BOOLEAN
  }
})

export async function upsertProduto(o) {
  const [modelo] = await Produto.upsert(o)
  console.log(modelo)
}

export async function getProduto(id) {
  const modelo = await Produto.findByPk(id, {
    rejectOnEmpty: true,
    attributes: ['id', 'descricao', 'valor']
  })
  return modelo.toJSON()
}

export async function lerProduto(id) {
  const modelo = await Produto.findByPk(id, {
    rejectOnEmpty: true
  })
  const o = modelo.toJSON()
  console.log(o)
}

export async function getProdutos() {
  const modelos = await Produto.findAll({
    attributes: ['id', 'descricao']
  })
  const rs = conversor(modelos)
  rs.sort((a, b) => a.descricao.localeCompare(b.descricao))
  return rs
}

export async function loja() {
  const modelos = await Produto.findAll({
    attributes: ['id', 'descricao', 'valor']
  })
  const rs = conversor(modelos)
  rs.sort((a, b) => a.descricao.localeCompare(b.descricao))
  return rs
}

export async function apagarProduto(id) {
  const destroyed = await Produto.destroy({ where: { id } })
  assert(destroyed, 'nada foi apagado')
}

export async function sincronizar() {
  await sequeConexao.sync({ force: true })
}
