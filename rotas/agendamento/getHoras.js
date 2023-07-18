const {servico} = require('../../models/servico')
//const horariosServico = require('../../models/horariosServico');
const horarioFuncionamento = require('../../models/horariosServico');
const moment = require('moment');
const { Op } = require("sequelize");
const _ = require('lodash')
const util = require('../servico/util');
const Agendamento = require('../../models/agendamento');


   const verificarHorarioDisponivel = async (req, res) => {
   try{
    const {data,especialidade,servicoId } = req.body;

   // console.log(req.body) 

   
    //buscar o horario de funcionamento da especialidade
    
    const horarios = await horarioFuncionamento.findAll({
          
    where: {
      especialidade:{
        [Op.startsWith]: especialidade
      },
      servicoId:servicoId
    },
     
    });

    console.log(horarios)

  
      
      //verificar se o horario de servico selecionado ja esta ocupado
      const horariosServico = await servico.findOne({
       attributes: 
        ['servicoId','duracao'],
          //exclude: ['id','servico', 'updatedAt', 'createdAt'],
         
          where: {

            servicoId:servicoId
          }
            });

        console.log(horariosServico) 
           
      let agenda = [];
      let lastday = moment(data)

      const horas = util.hourToMinutes(moment(horariosServico.duracao).format('HH:mm'))
     // console.log(horas);
     
      const servicoSlices = util.sliceMinutes(
        horariosServico.duracao,
         moment(horariosServico.duracao).add(horas, 'minutes'),
         util.Slot_Duration(servicoId)
 
       ).length;


       console.log(servicoSlices)
     
      /*
          VERIFICAR EM 365 SE TEM
          7 DIAS DISPONIVEIS


      */

      for(let i = 0; i <= 365 && agenda.length <= 3; i++){

        const espacosValidos = horarios.filter((h) => {
            //VERIFICAR O DIA DA SEMANA DISPONIVEL
          const diasSemanaDisponiveis = h.dias.includes(moment(lastday).day())


          const servicoDisponivel = h.especialidade.includes(especialidade)

         
          return diasSemanaDisponiveis && servicoDisponivel;
        });
         
        if(espacosValidos.length > 0){
          
          let todosHorario = {}; 
          
            
          for( let espaco of espacosValidos){
            for(let colaboradorId of espaco.colaboradorId){
              if(!todosHorario[colaboradorId]){
              todosHorario[colaboradorId] = []
            }
            
            
            todosHorario[colaboradorId]= [
            ...todosHorario[colaboradorId],
              ...util.sliceMinutes(
                util.mergeDateTime(lastday, espaco.inicio), 
                util.mergeDateTime(lastday, espaco.fim),
                util.Slot_Duration(servicoId)
              ),
              
              ]
            }
          }
          //recupera o colaboradorid 
        for(let colaboradorId of Object.keys(todosHorario)){

           // console.log(colaboradorId)
            const agendamentos = await Agendamento.findAll({
            where: {
               servicoId: {
                [Op.startsWith]: [colaboradorId]
                  },
                  
                  data: {
                    [Op.between]: [
                      moment(lastday).startOf('day').format('YYYY-MM-DD HH:mm:ss'),
                      moment(lastday).endOf('day').format('YYYY-MM-DD HH:mm:ss')
                    ]
                  }
                },
              include: [{
                
                  model: servico,
                  attributes: ['servicoId',  'duracao'],
                  where: {servicoId: colaboradorId}

                }],
              });
              

            //  util.ValidarDisponibilidade(agendamentos.data, agendamentos.hora)
        let horariosOcupados = agendamentos.map((agendamento) => ({
       
          inicio: moment(agendamento.hora),
          final: moment(agendamento.hora).add(
            util.hourToMinutes( moment(horariosServico.duracao).format('HH:mm')), 'minutes'),

          }));

              //RECUPERAR OS SLOTS ENTRE OS AGENDAMENTOS
          
          
          horariosOcupados = horariosOcupados.map(horario =>
           util.sliceMinutes(
              horario.inicio, 
              horario.final, 
              util.Slot_Duration(servicoId)
              )
          ).flat()
         
         
               
          //REMOVENDO TODOS OS HORARIOS OCUPADOS
           //QUEBRAR OS HORARIOS EM  UM ARRAY TODA VEZ QUE ACHAR UM HORARIO OCUPADO
         let horariosLivres = util.splitByValue(
            todosHorario[colaboradorId].map(horarioLivre => {
              //validando se existe dois horarios
          if (horariosOcupados.length === 2){  
               // console.log(horariosOcupados)
              return horariosOcupados.includes(horarioLivre) ? '-': horarioLivre
         }else { 
          return horarioLivre
        }
         }), '-').filter(space => space.length > 0)
         // console.log(horariosLivres)
           
                    
          horariosLivres = horariosLivres.filter(
            (horario) => horario.length >= servicoSlices
            );
          
            /*VERIFICANDO SE TEM horarios dentro dos slots 
              com espaços necessários
            */
           
           horariosLivres = horariosLivres.map(
            (slot) => slot.filter((horario,indice) => 
            slot.length - indice >= servicoSlices)).flat();

            //separar de 4 em 4 horarios
            horariosLivres = _.chunk(horariosLivres, 3);

            //remover colaborador caso não tenha nenhum espaço

            if(horariosLivres.length === 0){
              todosHorario = _.omit(todosHorario, colaboradorId)
            } else {todosHorario[colaboradorId] = horariosLivres
            }
          
            //verificar se tem especilista disponivel no dia

            const totalEspecialistas = Object.keys(todosHorario).length;

            if(totalEspecialistas > 0) {
             
              const horarioLivre = {
                [lastday.format('YYYY-MM-DD')]: todosHorario
              }
             agenda.push(
                {
                data: [lastday.format('YYYY-MM-DD')],
                horariosLivres
                
                
               
              }
                );
            
            }}
           
 }
        
    lastday = lastday.add(1,'day')
  }
   
      return res.status(200).json({
        agenda,
      })
    }  
     
    
   catch(error){
    res.status(500).json(console.log(error))
      
    }
  }
          
        
      
module.exports= verificarHorarioDisponivel;