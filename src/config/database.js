require('dotenv').config(); // magic

module.exports = {
  development: {
    dialect: 'sqlite',
    storage: './db.development.sqlite',
    logging: false,
    operatorsAliases: false,
    quoteIdentifiers: false // set case-insensitive
  },
  test: {
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
    operatorsAliases: false,
    quoteIdentifiers: false // set case-insensitive
  },
  production: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'equivalent',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql',
    logging: false,
    operatorsAliases: false,
    quoteIdentifiers: false // set case-insensitive
  }
};
