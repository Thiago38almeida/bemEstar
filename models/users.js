const  Sequelize =  require( "sequelize");
const  db = require ('./db')

const users = db.define('usuarios_bemEstar',{
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
        senha: {
            type: Sequelize.STRING,
            allowNull: false,
            },
            situacao: {
                type: Sequelize.STRING,
                allowNull: false,
                },
            especialidade: {
                type: Sequelize.STRING,
                allowNull: false,

            }
            
    
})

users.sync()

module.exports = users;