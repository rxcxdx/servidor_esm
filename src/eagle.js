import config from 'config'
import { Sequelize, DataTypes } from 'sequelize'

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
  valor: { type: DataTypes.REAL, allowNull: false }
})

const Despesa = sequeConexao.define('despesas', {
  id: {
    type: DataTypes.TEXT,
    primaryKey: true,
    allowNull: false
  },
  descricao: { type: DataTypes.TEXT, allowNull: false },
  valor: { type: DataTypes.REAL, allowNull: false },
  dt: { type: DataTypes.DATE, allowNull: false }
})

const Userclient = sequeConexao.define('userclients', {
  id: { type: DataTypes.TEXT, primaryKey: true, allowNull: false },
  username: { type: DataTypes.TEXT, allowNull: false, unique: true },
  senha: { type: DataTypes.TEXT, allowNull: false },
  liberado: { type: DataTypes.BOOLEAN, allowNull: false },
  access_token: { type: DataTypes.TEXT, allowNull: false }
})

export { sequeConexao, Produto, Despesa, Userclient }
