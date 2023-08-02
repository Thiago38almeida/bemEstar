const oracledb = require('oracledb');

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const mypw = 'mundial' 

async function run(req, res) {

    const id = '11466722';

    const connection = await oracledb.getConnection ({
        user          : "mundial",
        password      : mypw,
        connectString : "172.18.0.78/WMSPRD"
    });

    const result = await connection.execute(
        `select * from mundial.srt_bdt_batch_detail 
        where bdt_id =  ${id} `
    );

    console.log(result.rows);
    await connection.close();
}

const OracleDB = require('oracledb');
//const { Model } = require('sequelize');

async function connect() {
  try {
    const connection = await OracleDB.getConnection({
      user: "mundial",
      password: "mundial",
      connectString: "172.18.0.78/WMSPRD",
    });
    console.log('Connected successfully!');
    return connection;
  } catch (err) {
    console.error('Error connecting to the database:', err);
    throw err;
  }
}

module.exports =  connect;


//run();
