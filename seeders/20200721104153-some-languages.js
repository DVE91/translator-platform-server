"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "languages",
      [
        {
          title: "Dutch",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "English (American)",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "English (UK)",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "French",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Hongarian",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Italian",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "German",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Greek",
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
