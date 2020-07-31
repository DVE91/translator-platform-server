"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class profileTranslationSkills extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.profile);
      this.belongsTo(models.translationSkill);
    }
  }
  profileTranslationSkills.init(
    {
      profileId: DataTypes.INTEGER,
      translationSkillId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "profileTranslationSkills",
    }
  );
  return profileTranslationSkills;
};
