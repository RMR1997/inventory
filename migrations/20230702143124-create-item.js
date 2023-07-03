'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      itemId: {
        type: Sequelize.STRING,
      },
      itemName: {
        type: Sequelize.STRING
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: "categories",
          key:"id"
        }
      },
      ownershipId: {
        type: Sequelize.INTEGER,
        references: {
          model: "ownerships",
          key:"id"
        }
      },
      locationId: {
        type: Sequelize.INTEGER,
        references: {
          model: "locations",
          key:"id"
        }
      },
      qty: {
        type: Sequelize.INTEGER
      }, 
      status: {
        type: Sequelize.INTEGER
      },
      purchaseDate: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('items');
  }
};

