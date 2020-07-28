"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class translationSkill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.profile, {
        through: "profileTranslationSkills",
        foreignKey: "translationSkillId",
      });
      this.belongsTo(models.language, {
        foreignKey: "originalLanguageId",
        as: "originalLanguage",
      });
      this.belongsTo(models.language, {
        foreignKey: "nativeLanguageId",
        as: "nativeLanguage",
      });
    }
  }
  translationSkill.init(
    {
      originalLanguageId: DataTypes.INTEGER,
      nativeLanguageId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "translationSkill",
    }
  );
  return translationSkill;
};
