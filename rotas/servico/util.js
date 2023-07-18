const moment = require('moment');
const SMTP = require('../../config/email');
const nodemailer = require('nodemailer');
const logSystem  = require('../../logs/logsSystem');
const Agendamento = require('../../models/agendamento');
const Historico = require('../../models/historico');
const  Sequelize =  require( "sequelize");


module.exports = {

   
    Slot_Duration: (servicoId) => {

      console.log(servicoId)
    // let Slot_duration = 60;
     //let Slot_duration2 = 20;
     let Slot_duration;

     switch (servicoId) {
       case 'psicologaGLP':
       case 'psicologaMatriz':
        Slot_duration = 60;
         break;
       case 'massoterapiaMatriz':
       case 'massoterapiaGLP':
         Slot_duration = 20;
         break;
       default:
         // Valor padrão caso o servicoId não corresponda a nenhum dos casos anteriores
        // Slot_duration = 0;
         break;
     }

     return Slot_duration

    // console.log(Slot_duration)

    },
    hourToMinutes: (hourMinute) => {
        //1:00
       // console.log(hourMinute)
        const [hour, minutes] = hourMinute.split(':')

              
        return parseInt(parseInt(hour) * 60 + parseInt(minutes) )
       
       // parseInt(parseInt(hour))
      
    },
    sliceMinutes: (start, end, duration) => {
        const slices = [];
        let count = 0;
     start = moment(start)
     end = moment(end)
    

        while (end > start) {
          slices.push(start.format('HH:mm'));
          start = start.add(duration, 'minutes');
          count++;
        }
       // console.log(start, end, duration)
        return slices;
      },
      //concatenar as horas
      mergeDateTime: (date, time) => {
        const merged = `${moment(date).format('YYYY-MM-DD')}T${moment(time).format('HH:mm')}`
       
       

        return merged;
        
      },
     // SEPARAR OS ARRAYS PELO VALUE
     splitByValue: (array, value) => {
      const newArray = [[]];

      array.forEach((item) => {
        if (item != value) {
          newArray[newArray.length - 1].push(item);
          }
          else {
            newArray.push([]);
            }
          });
          return newArray;
     },
     sendMail: async (email, name, data, hora, especialidade, servicoId) => {
      // send mail with defined transport object
      let transporter = nodemailer.createTransport({
        host: SMTP.host,
        port: SMTP.port,
        secure:SMTP.secure, // true for 465, false for other ports
       auth:{  
        user: SMTP.user,
        pass: SMTP.pass,
        privateKey: SMTP.pass
      },
        tls: {
            rejectUnauthorized: false,
        }})
        let info = await transporter.sendMail({

          from: `'"Bem Estar" <DevFull@gmail.com>'`, // sender address
          to: email,
          subject: `Agendamento Bem Estar com ${especialidade} no dia ${data}`, // Subject line
          text: `Confirmado: Agendamento Bem Estar, no dia ${data} às ${hora}.`, // plain text body
          html:  `Olá ${name}, 
          \n\n\n\n
          ${especialidade.toUpperCase()} no dia ${data} às ${hora}.
          \n\n\n\n
          <b>Local:</b> Espaço Bem Estar.


          <button ><a href="http://localhost:19006/Reagendamento?param1=${servicoId}&param2=${data}&param3=${hora}">Agendar</a></button>
          <button ><a href="http://localhost:19006/Reagendamento/${servicoId}">Cancelar</a></button>
         
          
          `, 
          // html body
        });
       
        
      
      logSystem('email', info)
        
        
     },

     // Função para mover os agendamentos para a tabela de histórico
    
     houseKeeping:async () => {
        const registrosPassados = await Agendamento.findAll({
          where: {
            data: {
              [Sequelize.Op.lt]: new Date() // Filtra registros com data anterior à atual
            }
          }
        });
         
        // Inserir registros na tabela de histórico
       if (registrosPassados != null || []){
        // Percorrer o array de agendas e inserir os registros na tabela de histórico
        registrosPassados.forEach((agenda) => {
          const historicoData = {
            id: agenda.dataValues.id,
            nome: agenda.dataValues.nome,
            email: agenda.dataValues.email,
            data: agenda.dataValues.data,
            hora: agenda.dataValues.hora,
            id_especialista: agenda.dataValues.id_especialista,
            servicoId: agenda.dataValues.servicoId,
            createdAt: agenda.dataValues.createdAt,
            updatedAt: agenda.dataValues.updatedAt,
          };
      
         Historico.create(historicoData)
         .then((registro) => {
          console.log(`Registro ${registro} foi salvo no banco!`);
          }).catch(()=>{
            throw Error('Erro ao tentar criar registro')
            })
    
         })
    
      
        // Remover registros da tabela principal
        await Agendamento.destroy({
          where: {
            data: {
              [Sequelize.Op.lt]: new Date() // Filtra registros com data anterior à atual
            }
          }
        });
      }

    
      },
    

     //Verificar se existe mais de um agendamento para o dia e horario

     ValidarDisponibilidade: async (dados) => {
      let disponivel = false;
      try {
        const listaAgendamentos = await Agendamento.findAll({
          attributes : ['data','hora'],
          group:[['data', 'hora']],
          where: {
            data:{
              [Sequelize.Op.eq] :  dados.data
              },
              hora:{
                [Sequelize.Op.eq]:dados.hora
                  }
          }
        });
        console.log(listaAgendamentos)
           
     }
     catch{
      return true;
      }

    

    }
  }
