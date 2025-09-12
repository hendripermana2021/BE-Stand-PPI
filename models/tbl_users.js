'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tbl_users.init({
    name: DataTypes.STRING,
    name_stand: DataTypes.STRING,
    password: DataTypes.STRING,
    no_stand: DataTypes.INTEGER,
    id_role: DataTypes.INTEGER,
    accessToken: DataTypes.TEXT,
    refreshToken: DataTypes.TEXT,
    email: DataTypes.STRING,
    real_password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tbl_users',
  });
  return tbl_users;
};