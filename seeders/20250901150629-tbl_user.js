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
          name_stand: "",
          email: "hendri@gmail.com",
          password: await bcrypt.hash("12345", 10),
          real_password: "12345",
          id_role: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "yuli",
          name_stand: "Yuli Stand",
          email: "yuli@gmail.com",
          password: await bcrypt.hash("12345", 10),
          real_password: "12345",
          id_role: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Faiz Nur Hanum",
          name_stand: "Faiz Stand",
          email: "faiz@gmail.com",
          password: await bcrypt.hash("12345", 10),
          real_password: "12345",
          id_role: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "early",
          name_stand: "Early Stand",
          email: "early@gmail.com",
          password: await bcrypt.hash("12345", 10),
          real_password: "12345",
          id_role: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "asyief",
          name_stand: "Asyief Stand",
          email: "asyief@gmail.com",
          password: await bcrypt.hash("12345", 10),
          real_password: "12345",
          id_role: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "erni",
          name_stand: "Erni Stand",
          email: "erni@gmail.com",
          password: await bcrypt.hash("12345", 10),
          real_password: "12345",
          id_role: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "baqir",
          name_stand: "Baqir Stand",
          email: "baqir@gmail.com",
          password: await bcrypt.hash("12345", 10),
          real_password: "12345",
          id_role: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "mursyida",
          name_stand: "Mursyida Stand",
          email: "mursyida@gmail.com",
          password: await bcrypt.hash("12345", 10),
          real_password: "12345",
          id_role: 2,
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
