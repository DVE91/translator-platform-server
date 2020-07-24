"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "languages",
      [
        {
          originalLanguage: "Dutch",
          nativeLanguage: "Dutch",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          originalLanguage: "English (UK)",
          nativeLanguage: "English (UK)",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          originalLanguage: "English (American)",
          nativeLanguage: "English (American)",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("languages", null, {});
  },
};
