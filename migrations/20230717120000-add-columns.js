'use strict';


module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
     queryInterface.addColumn('agendas', 'comparecimento', {
      type: Sequelize.STRING,
      allowNull: true
    }),

     queryInterface.addColumn('agendas_h', 'comparecimento', {
      type: Sequelize.STRING,
      allowNull: true
    })
  
  ]);
})},


/*
     queryInterface.addColumn('horarioFuncionamentos', 'agendaId', {
      type: Sequelize.STRING,
      allowNull: true
    });

  },*/

  down: (queryInterface, Sequelize) => {
      return queryInterface.sequelize.transaction(t => {
        return Promise.all([
          queryInterface.removeColumn('agendas', 'comparecimento'),
          queryInterface.removeColumn('agendas_h', 'comparecimento')
        ]);
      });
    }
   // await queryInterface.removeColumn('horarioFuncionamentos', 'agendaId');
}


