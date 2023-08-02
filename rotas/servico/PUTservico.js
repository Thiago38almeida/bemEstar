const {Op, literal} = require('sequelize');
const horarioFuncionamento = require('../../models/horariosServico');
const moment = require('moment')
const isValid = require('moment')

const PutHorarioFuncio = async (req, res) => {
    const { especialidade, inicio, fim,dias,id, servicoId } = req.body;
    const colaboradorId = [`${servicoId}`];
 
  
     const horaInicio = moment(inicio, 'HH:mm:ss').format('YYYY/MM/DD HH:mm:ss');
    const horaFim = moment(fim, 'HH:mm:ss').format('YYYY/MM/DD HH:mm:ss');
     
     console.log( horaInicio, horaFim, dias)

      const isValidHoraInicio = moment(horaInicio, 'YYYY/MM/DD HH:mm:ss', true).isValid();
      const isValidHoraFim = moment(horaFim, 'YYYY/MM/DD HH:mm:ss', true).isValid();

      console.log(isValidHoraFim, isValidHoraInicio)
  
      if (fim < inicio) {
        return res.status(403).send({ error: 'Hora de início maior que o horário fim' });
      } else {
        try {
          if (isValidHoraInicio && isValidHoraFim) {
            // Assuming `id` is obtained from req.params or req.body.
            await horarioFuncionamento.update(
              { especialidade, colaboradorId, dias, inicio: horaInicio, fim: horaFim, servicoId },
              {
                where: { id } // You need to define `id` here, it's not present in the provided code snippet.
              }
            );
          } 
          else{
            return  res.status(400).json({erro: 'Horário inválido!'})
        }} catch (error) {
          res.status(400).json(error);
          throw error;
        }
      }
   return res.status(200).json('ok');

    }
  


  module.exports = PutHorarioFuncio;
