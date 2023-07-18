const { Sequelize } = require('sequelize');
require('dotenv').config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

const db = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  host: PGHOST,
  dialect: 'postgres',
  ssl: true, // Configuração de SSL
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Ajuste essa opção de acordo com suas configurações de SSL
    }
  }
});

try {
   db.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

module.exports = db;
