"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.user);
      this.hasMany(models.job);
      this.belongsToMany(models.translationSkill, {
        through: "profileTranslationSkills",
        foreignKey: "profileId",
      });
      this.hasOne(models.finance);
      this.hasMany(models.payment);
      this.hasMany(models.availability);
    }
  }
  profile.init(
    {
      experience: DataTypes.STRING,
      writingStyle: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "profile",
    }
  );
  return profile;
};
