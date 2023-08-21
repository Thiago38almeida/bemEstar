const Agendamento = require('../../models/agendamento')
const util = require('../servico/util')
const moment = require('moment')
const {Op} = require('sequelize')


const Agendar = async( req,res) => {
    const dados = req.body

   // console.log(typeof dados.telefone)
    // Validar se possui mais de 2 agendamentos no mesmo horario/dia

const data = new Date(dados.data)//.format('YYYY-MM-DD')


 const { count, rows } = await Agendamento.findAndCountAll({
  where: {
    servicoId: dados.servicoId,
    data: {
      [Op.eq]:data.toISOString()
    },
    hora: {
      [Op.eq]: dados.hora
    }
  },
  offset: 10,
  limit: 2
});



//console.log(data)

const getAgendamentoPorEmail = await Agendamento.findAll({
  where: {
    //nome : dados.nome,
    email: dados.email,
    data: data.toISOString()
    
  }
})

//console.log(getAgendamentoPorEmail)



  if(count === 2) {
    //throw new Error("Horário já está ocupado")
    res.status(400).json({mensagem: 'horarios já ocupado'})
  } else if (getAgendamentoPorEmail.length > 0) {
    res.status(400).json({erro: 'Limite de agendamento atingido para o mesmo dia!'})
  }
  else{
   
 Agendamento.create(dados)
        .then((agendamento)=> {
      // console.log(agendamento)
       
        //console.log(agendamento)
        const email = agendamento.email
        const id = agendamento.id
        const especialidade = agendamento.id_especialista
        const servicoId = agendamento.servicoId
        //const setor = agendamento.setor
        const data = moment.utc(agendamento.data).format('DD/MM/YYYY')
        const hora = moment(agendamento.hora).format('HH:mm')

        util.sendMail(email,agendamento.nome, data, hora, especialidade,id, servicoId)
        .then(() => console.log(`Email enviado para ${email} no dia ${new Date()}`))
        .catch((err) => console.log(err))
       //console.log(email)
         return res.status(200).json(agendamento)                       
        })
        .catch(err =>  res.status(500).json({ error: "Erro interno do servidor", err}))
      }    
  
    
}    

module.exports= Agendar;