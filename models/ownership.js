'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ownership extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ownership.hasOne(models.item,{
        foreignKey: "ownershipId"
      })
    }
  }
  ownership.init({
    ownershipName: DataTypes.STRING,
    ownershipCode: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ownership',
  });
  return ownership;
};