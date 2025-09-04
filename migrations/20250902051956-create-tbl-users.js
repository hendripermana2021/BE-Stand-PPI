'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbl_users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      no_stand: {
        type: Sequelize.INTEGER
      },
      id_role: {
        type: Sequelize.INTEGER
      },
      accessToken: {
        type: Sequelize.TEXT
      },
      refreshToken: {
        type: Sequelize.TEXT
      },
      email: {
        type: Sequelize.STRING
      },
      real_password: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tbl_users');
  }
};