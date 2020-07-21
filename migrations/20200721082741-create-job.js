"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("jobs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      wordCount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      originalLanguage: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nativeLanguage: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      originalDocument: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      translatedDocument: {
        type: Sequelize.STRING,
      },
      submitted: {
        type: Sequelize.BOOLEAN,
      },
      startingDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      endDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("jobs");
  },
};
