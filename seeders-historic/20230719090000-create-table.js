'use strict';
/*
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('servicosDisponiveis', {
      servicoId: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      duracao: {
        type: Sequelize.DATE,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    await queryInterface.createTable('agendas', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      telefone: {
        type: Sequelize.BIGINT(15),
        allowNull: false,
        },
      data: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      hora: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      id_especialista: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      servicoId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'servicosDisponiveis',
          key: 'servicoId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    await queryInterface.createTable('agendas_h', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      data: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      hora: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      id_especialista: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      servicoId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    await queryInterface.createTable('horarioFuncionamento', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true
        },
        especialidade: {
          type: Sequelize.STRING,
          allowNull: false
        },
        colaboradorId: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        dias: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        inicio: {
          type: Sequelize.DATE,
          allowNull: false
        },
        fim: {
          type: Sequelize.DATE,
          allowNull: false
        },
        servicoId: {
          type: Sequelize.STRING,
          allowNull: false,
          references: {
            model: 'servicosDisponiveis',
            key: 'servicoId'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
      });

    await queryInterface.createTable('usuarios', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true
        },
        nome: {
          type: Sequelize.STRING,
          allowNull: false
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false
        },
        senha: {
          type: Sequelize.STRING,
          allowNull: false
        },
        situacao: {
          type: Sequelize.STRING,
          allowNull: false
        },
        especialidade: {
          type: Sequelize.STRING,
          allowNull: false
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
      });
    },
  
    down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('horarioFuncionamento');
    await queryInterface.dropTable('agendas_h');
    await queryInterface.dropTable('agendas');
    await queryInterface.dropTable('servicosDisponiveis');
    await queryInterface.dropTable('usuarios');
  }
};
*/