const moment = require('moment');
const SMTP = require('../../config/email');
const nodemailer = require('nodemailer');
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
     sendMail: async (email, name, data, hora, especialidade,id, servicoId) => {
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
          html:  `<!DOCTYPE html>
          <html>
          <head>
            <title>Confirmação de Agendamento</title>
            <style>
              body {
                font-family: Harabara, sans-serif;
                line-height: 1.6;
                background-color: #f2f2f2;
                color: #333;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #fff;
                border-radius: 5px;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
              }
              .header {
                text-align: center;
                margin-bottom: 20px;
              }
              .content {
                margin-bottom: 20px;
              }
              .bold {
                font-weight: bold;
              }
              .footer {
                text-align: center;
              }
              .footer p {
                margin: 0;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Confirmação de Agendamento</h1>
              </div>
              <div class="content">
                <p>Olá <span class="bold">${name}</span>,</p>
                <p>Seu agendamento para ${especialidade} no dia ${data} às ${hora} foi realizado.</p>
                <p>Marque na sua agenda!</p>
              </div>
              <div class="footer">
                <p>Local: Espaço Bem Estar</p>
              </div>

              <button ><a href="http://localhost:19006/Reagendamento?param1=${servicoId}&param2=${data}&param3=${hora}&param4=${especialidade}&ref=${id}">Agendar</a></button>
              <button ><a href="http://localhost:19006/Cancelar?p=${id}">Cancelar</a></button>
         
          
            </div>
          </body>
          </html>
          
          
          `, 
          // html body
        });
       
        
      
     // logSystem('email', info)
        
        
     },
     sendMailCancelado: async (email, name, data, hora, especialidade) => {
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
          subject: `Agendamento Bem Estar com ${especialidade} no dia ${data} Cancelado!`, // Subject line
          text: `Confirmado:Cancelamento Agendamento Bem Estar, no dia ${data} às ${hora}.`, // plain text body
          html:  `<!DOCTYPE html>
          <html>
          <head>
            <title>Cancelamento de Agendamento</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                background-color: #f2f2f2;
                color: #333;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #fff;
                border-radius: 5px;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
              }
              .header {
                text-align: center;
                margin-bottom: 20px;
              }
              .content {
                margin-bottom: 20px;
              }
              .bold {
                font-weight: bold;
              }
              .footer {
                text-align: center;
              }
              .footer p {
                margin: 0;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Cancelamento de Agendamento</h1>
              </div>
              <div class="content">
                <p>Olá <span class="bold">${name}</span>,</p>
                <p>Seu agendamento para ${especialidade} no dia ${data} às ${hora} foi cancelado.</p>
                <p>Esperamos vê-lo(a) em breve!</p>
              </div>
              <div class="footer">
                <p>Local: Espaço Bem Estar</p>
              </div>
            </div>
          </body>
          </html>
          
          `, 
          // html body
        });
       
        
      
      //logSystem('email', info)
        
        
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
      
           
     }
     catch{
      return true;
      }

    

    },


    // exportar dados para o excel

    
  }
