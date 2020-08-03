"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "availabilities",
      [
        {
          profileId: 1,
          date: new Date("2020-08-07"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          profileId: 1,
          date: new Date("2020-08-05"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          profileId: 2,
          date: new Date("2020-08-06"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          profileId: 2,
          date: new Date("2020-08-05"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          profileId: 3,
          date: new Date("2020-08-08"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          profileId: 4,
          date: new Date("2020-08-06"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          profileId: 5,
          date: new Date("2020-08-07"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          profileId: 5,
          date: new Date("2020-08-08"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("availabilities", null, {});
  },
};
