const logSystem = require('../../logs/logsSystem')
const Agendamento = require('../../models/agendamento')
const util = require('../servico/util')
const moment = require('moment')


const Agendar = async( req,res) => {
    const dados = req.body
 /// ValidarDisponibilidade(dados)
 // util.ValidarDisponibilidade(dados)
   
 Agendamento.create(dados)
        .then((agendamento)=> {
       
       

        const email = agendamento.email
        const especialidade = agendamento.id_especialista
        const servicoId = agendamento.servicoId
       // const setor = agendamento.setor
        const data = moment.utc(agendamento.data).format('DD/MM/YYYY')
        const hora = moment(agendamento.hora).format('HH:mm')

        util.sendMail(email,agendamento.nome, data, hora, especialidade, servicoId)
        .then(() => console.log(`Email enviado para ${email} no dia ${new Date()}`))
        .catch((err) => console.log(err))
       //console.log(email)
         return res.status(200).json(agendamento)                       
        })
        .catch(err => {console.log(err)})
                           
}    

module.exports= Agendar;