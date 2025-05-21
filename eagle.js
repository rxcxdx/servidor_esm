import config from "config";
import { Sequelize, DataTypes } from "sequelize";

const STORAGE = config.get("eagle");

const sequeConexao = new Sequelize({
  dialect: "sqlite",
  storage: STORAGE,
  logging: undefined,
  define: { timestamps: false },
});

const attributesProduto = {
  id: { type: DataTypes.TEXT, primaryKey: true, allowNull: false },
  descricao: { type: DataTypes.TEXT, unique: true, allowNull: false },
  valor: { type: DataTypes.REAL, allowNull: false },
};

const optionsProduto = {
  freezeTableName: true,
};

const Produto = sequeConexao.define(
  "produtos",
  attributesProduto,
  optionsProduto
);

const attributesDespesa = {
  id: { type: DataTypes.TEXT, primaryKey: true, allowNull: false },
  descricao: { type: DataTypes.TEXT, allowNull: false },
  valor: { type: DataTypes.REAL, allowNull: false },
  dt: { type: DataTypes.DATE, allowNull: false },
};

const optionsDespesa = {
  freezeTableName: true,
};

const Despesa = sequeConexao.define(
  "despesas",
  attributesDespesa,
  optionsDespesa
);

const attributesUserclient = {
  id: { type: DataTypes.TEXT, primaryKey: true, allowNull: false },
  username: { type: DataTypes.TEXT, allowNull: false, unique: true },
  senha: { type: DataTypes.TEXT, allowNull: false },
  access_token: { type: DataTypes.TEXT, allowNull: false, unique: true },
  superuser: { type: DataTypes.BOOLEAN, allowNull: false },
  liberado: { type: DataTypes.BOOLEAN, allowNull: false },
};

const optionsUserclient = {
  freezeTableName: true,
};

const Userclient = sequeConexao.define(
  "userclients",
  attributesUserclient,
  optionsUserclient
);

export { Produto, Despesa, sequeConexao, Userclient };
