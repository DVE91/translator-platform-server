const bcrypt = require("bcrypt");
const myPassword = "test";
("use strict");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "users",
      [
        {
          fullName: "Diane",
          emailAddress: "testmail@mail.com",
          password: bcrypt.hashSync(myPassword, 10),
          imageUrl: "",
          isTranslator: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
