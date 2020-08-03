"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "translationSkills",
      [
        {
          originalLanguageId: 1,
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
          nativeLanguageId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          originalLanguageId: 2,
          nativeLanguageId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          originalLanguageId: 2,
          nativeLanguageId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          originalLanguageId: 2,
          nativeLanguageId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          originalLanguageId: 4,
          nativeLanguageId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          originalLanguageId: 4,
          nativeLanguageId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          originalLanguageId: 4,
          nativeLanguageId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          originalLanguageId: 3,
          nativeLanguageId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          originalLanguageId: 3,
          nativeLanguageId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          originalLanguageId: 3,
          nativeLanguageId: 4,
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
