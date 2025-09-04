'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.tbl_bucket = require("./tbl_bucket.js")(sequelize, Sequelize);
db.tbl_entry = require("./tbl_entry.js")(sequelize, Sequelize);
db.tbl_stuff = require("./tbl_stuff.js")(sequelize, Sequelize);
db.tbl_users = require("./tbl_users.js")(sequelize, Sequelize);
db.tbl_role = require("./tbl_role.js")(sequelize, Sequelize);
db.tbl_category = require("./tbl_category.js")(sequelize, Sequelize);
db.tbl_stuff_img = require("./tbl_stuff_img.js")(sequelize, Sequelize);

//Relation for Users
db.tbl_users.hasMany(db.tbl_stuff, {
  foreignKey: "id_users",
  as: "listMenuUsers",
  sourceKey: "id",
});

db.tbl_users.belongsTo(db.tbl_role, {
  as: "role",
  foreignKey: "id_role",
  targetKey: "id", // Example of a custom target key in tbl_role
});

// Relation for stuff
db.tbl_stuff.belongsTo(db.tbl_category, {
  as: "category",
  foreignKey: "id_category",
  targetKey: "id", // Example of a custom target key in tbl_role
});

db.tbl_stuff.belongsTo(db.tbl_users, {
  as: "owner",
  foreignKey: "id_user",
  targetKey: "id", // Example of a custom target key in tbl_role
});

db.tbl_stuff.hasMany(db.tbl_stuff_img, {
  foreignKey: "stuff_id",
  as: "listImage",
  sourceKey: "id",
});

//relation for category
db.tbl_category.hasMany(db.tbl_stuff, {
  foreignKey: "id_category",
  as: "productByCategory",
  sourceKey: "id",
});

//Relation for Entry
db.tbl_entry.hasMany(db.tbl_bucket, {
  foreignKey: "id_entry",
  as: "entryBucket",
  sourceKey: "id",
});

module.exports = db;
