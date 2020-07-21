"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class language extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.profile, {
        through: "profileLanguages",
        foreignKey: "languageId",
      });
    }
  }
  language.init(
    {
      originalLanguage: DataTypes.STRING,
      nativeLanguage: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "language",
    }
  );
  return language;
};
