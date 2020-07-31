"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("translationSkills", "originalLanguageId", {
      type: Sequelize.INTEGER,
      references: {
        model: "languages",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
    await queryInterface.addColumn("translationSkills", "nativeLanguageId", {
      type: Sequelize.INTEGER,
      references: {
        model: "languages",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      "translationSkills",
      "originalLanguageId"
    );
    await queryInterface.removeColumn("translationSkills", "nativeLanguageId");
  },
};
