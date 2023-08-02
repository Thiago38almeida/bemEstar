
const Agendamento = require("../../models/agendamento");
const { QueryTypes } = require('sequelize');
const db = require("../../models/db");
//const { UPDATE } = require("sequelize/types/query-types");


const AgendasUpdate = async (req, res) => {
  const { id, nome, email, data, hora, id_especialista, servicoId } = req.body;

 // console.log(req.body)


    Agendamento.update({nome, email, data,hora, id_especialista, servicoId}, {
        where:{
            id
        }
    })
    .then((resp)=>{res.json(resp)})
    .catch((err)=>console.log(`Error updating agenda ${ err }`))
   
  
};

module.exports = AgendasUpdate;
