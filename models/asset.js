'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class asset extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      asset.hasOne(models.item, {
        foreignKey: "assetId"
      })
    }
  }
  asset.init({
    assetName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'asset',
  });
  return asset;
};