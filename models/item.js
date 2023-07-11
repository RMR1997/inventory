'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      item.belongsTo(models.code, {
        foreignKey: "codeId",
      })
      item.belongsTo(models.asset, {
        foreignKey: "assetId",
      })
      item.belongsTo(models.category, {
        foreignKey: "categoryId",
      })
      item.belongsTo(models.ownership, {
        foreignKey: "ownershipId",
      })
      item.belongsTo(models.location, {
        foreignKey: "locationId",
      })


    }
  }
  item.init({
    itemId: DataTypes.STRING,
    itemName: DataTypes.STRING,
    merk: DataTypes.STRING,
    qty: DataTypes.INTEGER,
    price: DataTypes.STRING,
    total: DataTypes.STRING,
    purchaseDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'item',
  });
  return item;
};