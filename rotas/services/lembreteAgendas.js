const Agendamento = require('../../models/agendamento')
const { Op } = require('sequelize');
//const moment = require('moment')
const util = require('./util');
const moment = require('moment');

const LembreteAgendamentos = async (req, res) => {
 // const  servicoId  = req.params.user;
 const now = moment().format('YYYY-MM-DD HH:mm:ss');
 const nowNextHours = moment().add(2, 'days').format('YYYY-MM-DD HH:mm:ss')
//2023-08-28 00:00:00
// console.log(nowNextHours, now)
 
  try {
    const agendamentos = await Agendamento.findAll({
      where: {
        data: {
            [Op.between]: [now, nowNextHours],
      }
    }});

     agendamentos.map((dados) => {

      const data = moment(dados.data).format('DD/MM/YYYY')
      const hora = moment(dados.hora).format('HH:mm')

    util.sendMailLembrete(dados.email, dados.nome,data, hora, dados.id_especialista, dados.id, dados.servicoID)
    .then((ok)=> {
        return ok
    })
    .catch((err) =>{
        console.error(err)
        return err
    })
    })

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocorreu um erro ao buscar os agendamentos.' });
  }
};

module.exports = LembreteAgendamentos;
