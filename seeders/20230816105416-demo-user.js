'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
      await queryInterface.bulkInsert('usuarios_bemEstars', [{
        nome: 'psicologaGLP',
        email:'psicologaGLP@bemestar',
        senha:"1234",
        situacao: 'A' ,
        especialidade: 'psicologa',
        createdAt: new Date(),
        updatedAt: new Date()
      }],{})

      await queryInterface.bulkInsert('usuarios_bemEstars', [{
        nome: 'psicologaMatriz',
        email:'psicologaMatriz@bemestar',
        senha:"1234",
        situacao: 'A' ,
        especialidade: 'psicologa',
        createdAt: new Date(),
        updatedAt: new Date()
      }],{})
    
  },

  async down (queryInterface, Sequelize) {
   
     await queryInterface.bulkDelete('usuarios', null, {});
     
  }
};
