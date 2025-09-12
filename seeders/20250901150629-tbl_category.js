'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "tbl_categories",
      [
        {
          name_category: "Makanan",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_category: "Minuman",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_category: "Accessories",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tbl_categories", null, {});
  },
};
