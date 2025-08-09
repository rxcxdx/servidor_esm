import { Sequelize, DataTypes } from 'sequelize'
import config from 'config'

const STORAGE = config.get('eagle')

const CONFIG_GLOBAL = { timestamps: false, freezeTableName: true }

const sequeConexao = new Sequelize({
  dialect: 'sqlite',
  storage: STORAGE,
  logging: undefined,
  define: CONFIG_GLOBAL
})

const Produto = sequeConexao.define('produtos', {
  id: { type: DataTypes.TEXT, primaryKey: true, allowNull: false },
  descricao: { type: DataTypes.TEXT, unique: true, allowNull: false },
  valor: { type: DataTypes.REAL, allowNull: false },
  categoriaId: { type: DataTypes.TEXT, allowNull: false }
})

const Categoria = sequeConexao.define('categorias', {
  id: { type: DataTypes.TEXT, primaryKey: true, allowNull: false },
  descricao: { type: DataTypes.TEXT, unique: true, allowNull: false }
})

Produto.belongsTo(Categoria, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })

sequeConexao.define('despesas', {
  id: { type: DataTypes.TEXT, primaryKey: true, allowNull: false },
  descricao: { type: DataTypes.TEXT, allowNull: false },
  valor: { type: DataTypes.REAL, allowNull: false },
  dt: { type: DataTypes.DATE, allowNull: false }
})

sequeConexao.define('userclients', {
  id: { type: DataTypes.TEXT, primaryKey: true, allowNull: false },
  username: { type: DataTypes.TEXT, allowNull: false, unique: true },
  senha: { type: DataTypes.TEXT, allowNull: false },
  liberado: { type: DataTypes.BOOLEAN, allowNull: false },
  access_token: { type: DataTypes.TEXT, allowNull: false }
})

export async function produto(id) {
  const modelo = await Produto.findByPk(id, { rejectOnEmpty: true })
  return modelo.toJSON()
}

/*
export async function produtos() {
  const docs = await Produto.findAll({
    attributes: ['id', 'descricao'],
    raw: true
  })
  docs.sort((a, b) => a.descricao.localeCompare(b.descricao))
  return docs
}
*/

export async function produtosIndice() {
  const modelos = await Produto.findAll({
    include: { all: true }
  })
  const rs = []
  modelos.forEach((o) => {
    rs.push({
      id: o.id,
      descricao: o.descricao,
      categoria: o.categoria.descricao
    })
  })
  return rs
}

export async function categorias() {
  const modelos = await Categoria.findAll({
    raw: true
  })
  return modelos
}

export async function loja() {
  const docs = await Produto.findAll({
    attributes: ['id', 'descricao', 'valor'],
    raw: true
  })
  docs.sort((a, b) => a.descricao.localeCompare(b.descricao))
  return docs
}

export async function gravarProduto(entrada) {
  await Produto.upsert(entrada)
}

export async function sincronizar() {
  await sequeConexao.sync()
  console.log('successfully')
}
