"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("finances", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      currentBalance: {
        defaultValue: 0,
        type: Sequelize.FLOAT,
      },
      centsPerWord: {
        defaultValue: 0.07,
        type: Sequelize.FLOAT,
      },
      urgentDeliveryFee: {
        defaultValue: 5.0,
        type: Sequelize.FLOAT,
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
    await queryInterface.dropTable("finances");
  },
};
