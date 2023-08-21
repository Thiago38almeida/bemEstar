'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    

      await queryInterface.bulkInsert('agendas', [
        {
          telefone: 11912344321,
          updatedAt: new Date(),
         
        }
      ],{})


    
  },

  async down (queryInterface, Sequelize) {
   
     await queryInterface.bulkDelete('agendas', null, {});
     
  }
};
