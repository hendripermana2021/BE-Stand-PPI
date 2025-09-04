'use strict';

/** @type {import('sequelize-cli').Migration} */
const bcrypt = require('bcryptjs');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "tbl_users",
      [
        {
          name: "Hendri",
          email: "hendri@gmail.com",
          password: await bcrypt.hash("12345", 10),
          real_password: "12345",
          id_role: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tbl_users", nusll, {});
  },
};
