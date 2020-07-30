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
        {
          userId: 2,
          experience: "I got loads of translation experience",
          writingStyle: "Classic, professional",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 4,
          experience: "I love writing fan fics",
          writingStyle: "Whimsical, fantastic",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 5,
          experience:
            "I worked for a publisher as an editor for 5 years. Now I'm a freelancer.",
          writingStyle: "I love a dramatic, bold and descriptive text",
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
