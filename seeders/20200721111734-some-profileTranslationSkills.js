"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "profileTranslationSkills",
      [
        {
          profileId: 1,
          translationSkillId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
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
          profileId: 2,
          translationSkillId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          profileId: 3,
          translationSkillId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          profileId: 3,
          translationSkillId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          profileId: 4,
          translationSkillId: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          profileId: 4,
          translationSkillId: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          profileId: 5,
          translationSkillId: 9,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          profileId: 5,
          translationSkillId: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          profileId: 5,
          translationSkillId: 11,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          profileId: 4,
          translationSkillId: 12,
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
