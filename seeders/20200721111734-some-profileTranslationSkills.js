"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "profileTranslationSkills",
      [
        {
          profileId: 1,
          translationSkillId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          profileId: 2,
          translationSkillId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          profileId: 3,
          translationSkillId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          profileId: 2,
          translationSkillId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          profileId: 1,
          translationSkillId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("profileTranslationSkills", null, {});
  },
};
