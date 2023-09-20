'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    

      await queryInterface.bulkInsert('servicosdisponiveis', [{
        
        servicoId: 'massoterapiaGLP',
        duracao: '2023-08-25 03:20:00',
        createdAt: new Date(),
        updatedAt: new Date()
      }],{})

      await queryInterface.bulkInsert('servicosdisponiveis', [{
        servicoId: 'massoterapiaMatriz',
        duracao: '2023-08-25 03:20:00',
        createdAt: new Date(),
        updatedAt: new Date()
      }],{})

      await queryInterface.bulkInsert('servicosdisponiveis', [{
        servicoId: 'psicologaGLP',
        duracao: '2023-08-25 04:00:00',
        createdAt: new Date(),
        updatedAt: new Date()
      }],{})

      await queryInterface.bulkInsert('servicosdisponiveis', [{
        servicoId: 'psicologaMatriz',
        duracao: '2023-08-25 04:00:00',
        createdAt: new Date(),
        updatedAt: new Date()
      }],{})
    
  },

  async down (queryInterface, Sequelize) {
   
     await queryInterface.bulkDelete('servicosdisponiveis', null, {});
     
  }
};

