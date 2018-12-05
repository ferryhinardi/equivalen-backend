import Sequelize from 'sequelize';
import cls from 'continuation-local-storage';
import path from 'path';
import getFiles from 'utils/file/getFiles';

const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../config/database`)[env];
const db = {};
let sequelize;
const NAMESPACE = 'cls-transaction';

const modelsFile = getFiles(path.join(__dirname, '../modules/**/models/*.js'));

const namespace = cls.createNamespace(NAMESPACE);
Sequelize.useCLS(namespace);

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

modelsFile.forEach(modelFile => {
  const model = sequelize.import(modelFile);
  db[model.name] = model;
});

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

async function transaction(operation) {
  let t = namespace.get('transaction');
  const hasTrans = !!t;
  t = t  || await sequelize.transaction();
  try {
    const result = await operation.apply(null);
    if (!hasTrans) await t.commit();
    return result;
  }
  catch (e) {
    if (!hasTrans) await t.rollback();
    throw e;
  }
}

db.sequelize = sequelize;
db.sequelize.transactioncls = transaction;

db.Sequelize = Sequelize;

export default db;
