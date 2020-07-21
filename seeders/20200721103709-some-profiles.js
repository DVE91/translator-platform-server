"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "profiles",
      [
        {
          userId: 1,
          experience: "I've been a freelance translator for the past 4 years.",
          writingStyle: "Witty, humorous, appealing to young audiences",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("profiles", null, {});
  },
};
