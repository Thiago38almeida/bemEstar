
const Agendamento = require("../../models/agendamento");
const { QueryTypes } = require('sequelize');
const db = require("../../models/db");
//const { UPDATE } = require("sequelize/types/query-types");


const AgendasUpdateComparecimento = async (req, res) => {
  const { id, comparecimento } = req.body;

// console.log(req.body)


    await Agendamento.update({comparecimento: comparecimento}, {
        where:{
            id
        }
    })
    .then((resp)=>{res.status(200).json({m: "atualizado: ",resp})})
    .catch((err)=>console.log(`Error updating agenda ${ err }`))
   
  
};

module.exports = AgendasUpdateComparecimento;
