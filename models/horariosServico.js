const  Sequelize =  require( "sequelize");
const  db = require ('./db');
const { servico} = require("./servico");

const horarioFuncionamento = db.define('horarioFuncionamento',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    especialidade: {
    type: Sequelize.STRING,
    allowNull: false,
    },
    colaboradorId: {
        type: Sequelize.TEXT,
        allowNull: false,
        get() {
            const value = this.getDataValue('colaboradorId');
            return value ? JSON.parse(value) : null;
          },
          set(value) {
            this.setDataValue('colaboradorId', JSON.stringify(value));
          }
      
    
    },
    
    dias: {
        type: Sequelize.TEXT,
    allowNull: false,
    get() {
      const value = this.getDataValue('dias');
      return value ? JSON.parse(value) : null;
    },
    set(value) {
      this.setDataValue('dias', JSON.stringify(value));
    }

    },
    inicio: {
        type: Sequelize.DATE,
        allowNull: false,

    },
    fim: {
        type: Sequelize.DATE,
        allowNull: false,
        },
    
                

                
            
    
})

horarioFuncionamento.hasOne(servico)
horarioFuncionamento.belongsTo(servico,{ foreignKey: 'servicoId' });


//horarioFuncionamento.sync()

module.exports = horarioFuncionamento;