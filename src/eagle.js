import { Sequelize, DataTypes } from 'sequelize'
import config from 'config'
import { validarProduto } from './utils.js'

const STORAGE = config.get('eagle')

const CONFIG_GLOBAL = {
  timestamps: false,
  freezeTableName: true
}

const sequeConexao = new Sequelize({
  dialect: 'sqlite',
  storage: STORAGE,
  logging: undefined,
  define: CONFIG_GLOBAL
})

const Produto = sequeConexao.define('produtos', {
  id: {
    type: DataTypes.TEXT,
    primaryKey: true
  },
  descricao: {
    type: DataTypes.TEXT,
    unique: true
  },
  valor: {
    type: DataTypes.REAL
  }
})

const Categoria = sequeConexao.define('categorias', {
  id: {
    type: DataTypes.TEXT,
    primaryKey: true
  },
  descricao: {
    type: DataTypes.TEXT,
    unique: true
  }
})

Produto.belongsTo(Categoria)

export async function gravarProduto(body) {
  const data = validarProduto(body)
  await Produto.upsert({
    id: data.id,
    descricao: data.descricao,
    valor: data.valor,
    categoriaId: data.categoria.id
  })
}

export async function getProduto(id) {
  const modelo = await Produto.findByPk(id, {
    rejectOnEmpty: true,
    include: { all: true },
    attributes: ['id', 'descricao', 'valor']
  })
  return modelo
}

export async function buscarProdutos() {
  const modelos = await Produto.findAll({
    attributes: ['id', 'descricao']
  })
  modelos.sort((a, b) => a.descricao.localeCompare(b.descricao))
  return modelos
}

export async function buscarCategorias() {
  const modelos = await Categoria.findAll()
  modelos.sort((a, b) => a.descricao.localeCompare(b.descricao))
  return modelos
}

export async function loja() {
  const modelos = await Produto.findAll({
    attributes: ['id', 'descricao', 'valor']
  })
  modelos.sort((a, b) => a.descricao.localeCompare(b.descricao))
  return modelos
}

export async function sincronizar() {
  await sequeConexao.sync()
}

export async function associarCategoria(produtoId, categoriaId) {
  const modelo = await Produto.findByPk(produtoId)
  await modelo.setCategoria(categoriaId)
}

export async function reload() {
  await Categoria.upsert({ id: 'n8JdN9W0PF1awl', descricao: 'verde' })
  await Categoria.upsert({ id: 'iGgl5N2eS2', descricao: 'amarelo' })
  await Produto.upsert({
    id: 'sz3i82BQIO',
    descricao: 'fanta',
    valor: 1,
    categoriaId: 'n8JdN9W0PF1awl'
  })
}
