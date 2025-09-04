'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_stuff extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tbl_stuff.init({
    name: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    status: DataTypes.BOOLEAN,
    qty: DataTypes.INTEGER,
    img: DataTypes.STRING,
    id_category: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER,
    ingridient: DataTypes.TEXT,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'tbl_stuff',
  });
  return tbl_stuff;
};