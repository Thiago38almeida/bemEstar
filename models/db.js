const { Sequelize } = require('sequelize');
const mssql = require('mssql');
const pg = require('pg');
require('dotenv').config();

const {SSHOST, SSDATABASE, SSUSER, SSPASSWORD} = process.env
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

const db = new Sequelize('calendar', 'root', '', {
  host:'localhost' || '127.0.0.1',
  port :3306,
  dialect: 'mysql',
  logging:(sql)=>{console.log("SQL:", sql)},
  pool:{}

})
*/
/*
const db = new Sequelize(SSDATABASE, SSUSER, SSPASSWORD, {
  host: SSHOST,
  dialect: 'mssql',
  
});
*/
try {
  db.authenticate();
  // mundial.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

module.exports = db;
