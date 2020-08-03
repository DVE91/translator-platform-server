"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "jobs",
      [
        {
          profileId: 1,
          paymentId: 1,
          title: "5 leukste steden in Noord-Italië",
          type: "blogpost",
          wordCount: 6,
          originalLanguage: "Dutch",
          nativeLanguage: "Engels (UK)",
          originalDocument: "Ontdek Verona, Piemonte, Friuli en meer!",
          translatedDocument: "Discover Verona, Piemonte, Friuli and more!",
          submitted: false,
          startingDate: new Date(2020, 8, 10),
          endDate: new Date(2020, 8, 16),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("jobs", null, {});
  },
};
