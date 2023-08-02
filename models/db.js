const { Sequelize } = require('sequelize');
const pg = require('pg')
const pghstore = require('pg-hstore')
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

/*
const db2 = new Sequelize('calendar', 'root', '', {
  host:'localhost' || '127.0.0.1',
  port :3306,
  dialect: 'mysql',
  logging:(sql)=>{console.log("SQL:", sql)},
  pool:{}

})
*/

try {
  db.authenticate();
  // mundial.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

module.exports = db;
