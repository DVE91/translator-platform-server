"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class finance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.profile);
    }
  }
  finance.init(
    {
      currentBalance: DataTypes.FLOAT,
      centsPerWord: DataTypes.FLOAT,
      urgentDeliveryFee: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "finance",
    }
  );
  return finance;
};
