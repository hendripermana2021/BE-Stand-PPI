'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_entry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tbl_entry.init({
    status: DataTypes.BOOLEAN,
    created_by: DataTypes.STRING,
    pay_by: DataTypes.STRING,
    id_user: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'tbl_entry',
  });
  return tbl_entry;
};