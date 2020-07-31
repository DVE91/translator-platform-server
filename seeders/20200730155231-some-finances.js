"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "finances",
      [
        {
          profileId: 1,
          currentBalance: 434.8,
          centsPerWord: 0.06,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          profileId: 2,
          currentBalance: 10.95,
          centsPerWord: 0.06,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          profileId: 3,
          currentBalance: 120.6,
          centsPerWord: 0.06,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          profileId: 4,
          currentBalance: 80.75,
          centsPerWord: 0.07,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("finances", null, {});
  },
};
