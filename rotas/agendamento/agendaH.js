
const express = require('express')
const db = require('../../models/db');
const Agendamento = require('../../models/agendamento');
const { Op } = require("sequelize");
const Historico = require('../../models/historico');



const Agendas_h = async (req, res) =>{

  const servicoId = req.params.user;
  const especialidade = req.params.especialidade;

//  console.log(servicoId, especialidade)

  await Historico.findAll(
  { 
    where: {
    id_especialista: {
      [Op.startsWith]: especialidade
    },
    servicoId: {
      [Op.like]: servicoId
    }
  }
  }

   
  )
  .then(agendamentos => {
    res.json(agendamentos);
    })
    .catch(err => {
      if (typeof err === 'string') {
        console.error(err);
      } else {
        console.error(JSON.stringify(err));
      }
      res.status(500).json({ error: "Erro interno do servidor" });
    })
  }

   
module.exports= Agendas_h;