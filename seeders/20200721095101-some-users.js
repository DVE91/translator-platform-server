const bcrypt = require("bcrypt");
const myPassword = "test";
("use strict");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "users",
      [
        {
          fullName: "John",
          emailAddress: "testmail@mail.com",
          password: bcrypt.hashSync(myPassword, 10),
          imageUrl:
            "https://image.shutterstock.com/mosaic_250/1849259/575234476/stock-photo-good-looking-man-in-glasses-portrait-575234476.jpg",
          isTranslator: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fullName: "Jane",
          emailAddress: "test@mail.com",
          password: bcrypt.hashSync(myPassword, 10),
          imageUrl:
            "https://image.shutterstock.com/image-photo/headshot-portrait-happy-ginger-girl-260nw-623804987.jpg",
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
