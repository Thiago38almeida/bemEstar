const Agendamento = require("../../models/agendamento");
const util = require("../servico/util");
const moment = require('moment');


const DeleteAgendas = async (req, res) => {
    try{
        const agendaId= req.params.id;
        const agenda = await Agendamento.findByPk(agendaId)

        if(agenda){

          const data = moment(agenda.data).format('DD/MM/YYYY')
          const hora = moment(agenda.hora).format('HH:mm')

        util.sendMailCancelado(agenda.email, agenda.nome, data, hora, agenda.id_especialista)


          const request =  await Agendamento.destroy({
            where: {
              id: agendaId
            }
        })

        return res.status(204).json('Agendamento excluido com sucesso!')


        } 
        else{
        throw new Error ('Não foi possível encontrar o agendamento')
        }
       
       // console.log(request)
        }catch(err){
            console.log("Error in deleting the agenda", err);
            return  res.status(500).send();
            };



}

module.exports = DeleteAgendas;