'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Languages', [
     {
       langID: 1,
       langName: 'JavaScript',
       createdAt: new Date(),
       updatedAt: new Date()

     },
     {
       langID: 2,
       langName: 'HTML5',
       createdAt: new Date(),
       updatedAt: new Date()

     },
     {
       langID: 3,
       langName: 'Java',
       createdAt: new Date(),
       updatedAt: new Date()

     }
   ]);
  },

  down: (queryInterface, Sequelize) => {
  }
};
