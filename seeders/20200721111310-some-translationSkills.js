"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "translationSkills",
      [
        {
          originalLanguageId: 1,
          nativeLanguageId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          originalLanguageId: 6,
          nativeLanguageId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          originalLanguageId: 1,
          nativeLanguageId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          originalLanguageId: 1,
          nativeLanguageId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          originalLanguageId: 1,
          nativeLanguageId: 5,
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
