"use strict";
const { Model } = require("sequelize");
const translationSkill = require("./translationSkill");
module.exports = (sequelize, DataTypes) => {
  class language extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.language, {
        through: "translationSkills",
        foreignKey: "originalLanguageId",
        as: "originalLanguage",
      });
      this.belongsToMany(models.language, {
        through: "translationSkills",
        foreignKey: "nativeLanguageId",
        as: "nativeLanguage",
      });
    }
  }
  language.init(
    {
      title: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "language",
    }
  );
  return language;
};
