
const express = require('express')
const db = require('../../models/db');
const Agendamento = require('../../models/agendamento')


const AgendamentosID = async (req, res) =>{
const {id} = req.params;
  await Agendamento.findAll({
    where: {
        id:id
    }
  })
  .then(agendamentos => {
    res.json(agendamentos);
    })
    .catch(err => {
        res.json(err);
        });
        }

   
module.exports= AgendamentosID;