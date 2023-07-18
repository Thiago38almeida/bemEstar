'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('servicosDisponiveis', 'horarioFuncionamentoId', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.addColumn('servicosDisponiveis', 'agendaId', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('servicosDisponiveis', 'horarioFuncionamentoId');
    await queryInterface.removeColumn('servicosDisponiveis', 'agendaId');
  }
};
