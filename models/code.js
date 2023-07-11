'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class code extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      code.hasOne(models.item, {
        foreignKey: "codeId"
      })
    }
  }
  code.init({
    codeName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'code',
  });
  return code;
};