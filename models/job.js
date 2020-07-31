"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.profile);
      this.belongsTo(models.payment);
    }
  }
  job.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      wordCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      originalLanguage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nativeLanguage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      originalDocument: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      translatedDocument: DataTypes.TEXT,
      submitted: DataTypes.BOOLEAN,
      startingDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "job",
    }
  );
  return job;
};
