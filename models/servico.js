const  Sequelize =  require( "sequelize");
const  db = require ('./db')

const servico = db.define('servicosDisponiveis',{
    servicoId: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
   },
    duracao: {
        type: Sequelize.DATE,
        allowNull: false,

    }

                

                
            
    
})

servico.sync()

module.exports = {servico};