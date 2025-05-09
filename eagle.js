import config from 'config'
import { Sequelize, DataTypes } from 'sequelize'

const STORAGE = config.get('eagle')

const sequeConexao = new Sequelize({
  dialect: 'sqlite',
  storage: STORAGE,
  logging: undefined,
  define: { timestamps: false },
})

const attributesProduto = {
  id: { type: DataTypes.TEXT, primaryKey: true, allowNull: false },
  descricao: { type: DataTypes.TEXT, unique: true, allowNull: false },
  valor:{ type: DataTypes.REAL, allowNull: false },
  isAtalho: { type: DataTypes.BOOLEAN, allowNull: false }
}

const optionsProduto = {
  freezeTableName: true
}

const Produto = sequeConexao.define('produtos', attributesProduto, optionsProduto)

const attributesDespesa = {
  id: { type: DataTypes.TEXT, primaryKey: true, allowNull: false },
  descricao: { type: DataTypes.TEXT },
  valor:{ type: DataTypes.REAL },
  dt: { type: DataTypes.DATE }
}

const optionsDespesa = {
  freezeTableName: true
}

const Despesa = sequeConexao.define('despesas', attributesDespesa, optionsDespesa)

const optionsCategoria = {
  freezeTableName: true
}

const Categoria = sequeConexao.define('categorias', {
  id: { type: DataTypes.TEXT, primaryKey: true, allowNull: false },
  descricao: { type: DataTypes.TEXT, unique: true }
}, optionsCategoria)

Produto.belongsTo(Categoria, { onDelete: 'RESTRICT' })

// sequeConexao.showAllSchemas()

export { Produto, Despesa, Categoria, sequeConexao };

