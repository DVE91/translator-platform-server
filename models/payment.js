"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.profile);
      this.hasOne(models.job);
      this.belongsTo(models.user);
    }
  }
  payment.init(
    {
      totalPrice: DataTypes.FLOAT,
      paid: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "payment",
    }
  );
  return payment;
};
