'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_bucket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tbl_bucket.init({
    name_stuff: DataTypes.STRING,
    id_entry: DataTypes.INTEGER,
    price: DataTypes.DOUBLE,
    qty: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'tbl_bucket',
  });
  return tbl_bucket;
};