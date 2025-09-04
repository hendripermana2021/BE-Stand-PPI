'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_stuff_img extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tbl_stuff_img.init({
    stuff_id: DataTypes.INTEGER,
    img_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tbl_stuff_img',
  });
  return tbl_stuff_img;
};