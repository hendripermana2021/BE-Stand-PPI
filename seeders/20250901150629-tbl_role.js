'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "tbl_roles",
      [
        {
          name_role: "Admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_role: "Penjual",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tbl_roles", nusll, {});
  },
};
