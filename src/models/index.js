'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var decamelize = require('decamelize');
var getFiles  = require('utils/file/getFiles');
var basename  = path.basename(__filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(`${__dirname}/../config/database`)[env];
var db        = {};

const modelsFile = getFiles(path.join(__dirname, '../modules/**/models/*.js'));

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

modelsFile
  .forEach(modelFile => {
    const model = sequelize.import(modelFile);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
