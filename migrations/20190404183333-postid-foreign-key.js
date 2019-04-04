'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint(
      'Comments',
      ['postId'], {
        type: 'FOREIGN KEY',
        name: 'FK_postId',
        references: {
          table: 'Posts',
          field: 'id'
        }
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint(
      'Comments',
      'FK_postId'
    )
  }
};
