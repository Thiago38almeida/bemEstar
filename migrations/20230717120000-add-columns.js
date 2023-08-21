'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('agendas', 'telefone', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
/*
    await queryInterface.addColumn('horarioFuncionamentos', 'agendaId', {
      type: Sequelize.STRING,
      allowNull: true
    });
*/
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('agendas', 'telefone');
   // await queryInterface.removeColumn('horarioFuncionamentos', 'agendaId');
  }
};
