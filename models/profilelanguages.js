"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class profileLanguages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.profile);
      this.belongsTo(models.language);
    }
  }
  profileLanguages.init(
    {
      profileId: DataTypes.INTEGER,
      languageId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "profileLanguages",
    }
  );
  return profileLanguages;
};
