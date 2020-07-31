"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.profile);
      this.hasMany(models.payment);
    }
  }
  user.init(
    {
      fullName: { type: DataTypes.STRING, allowNull: false },
      emailAddress: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
      isTranslator: { type: DataTypes.BOOLEAN, allowNull: false },
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
