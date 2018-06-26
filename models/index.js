'use strict';

// import { readdirSync } from 'fs';
var fs = require('fs');
// import { basename as _basename, join } from 'path';
var path = require('path');
// import Sequelize from 'sequelize';
var Sequelize = require('sequelize');
// var basename  = _basename(__filename);
var basename = path.basename(__filename);
var env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/../config/config.json')[env];
var db = {};

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// readdirSync(__dirname)
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    // var model = sequelize['import'](join(__dirname, file));
    var model = sequelize['import'](path.join(__dirname, file)); 
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// export default db;
module.exports = db; 
