const {Op, literal} = require('sequelize');
const horarioFuncionamento = require('../../models/horariosServico');
const moment = require('moment')
const isValid = require('moment')

const  PutHorarioFuncio = async (req, res) => {
    
    const {id, especialidade, colaboradorId, dias, inicio, fim, servicoId} = req.body;
    //const {id} = req.params.id;



    const horaInicio = moment(inicio, 'HH:mm:ss').format('YYYY/MM/DD HH:mm:ss')//new Date(`1970-01-01 ${inicio}`);
    const horaFim = moment(fim, 'HH:mm:ss').format('YYYY/MM/DD HH:mm:ss')// new Date(`1970-01-01 ${fim}`);

    const isValidHoraInicio = moment(horaInicio, 'YYYY/MM/DD HH:mm:ss', true).isValid();
    const isValidHoraFim = moment(horaFim, 'YYYY/MM/DD HH:mm:ss', true).isValid();

    console.log(horaInicio, horaFim)
    
    if(horaFim < horaInicio){
       
        return res.status(403).send({error: 'Hora de início maior que o horario fim'})

       }
       else{

        try {

            if(isValidHoraInicio && isValidHoraFim){
        
            await horarioFuncionamento.update({especialidade, colaboradorId, dias,inicio: horaInicio,fim: horaFim, servicoId},
                     {
                        where:{id}
    
                    
                    })
                return  res.status(200).json('ok')

                }
            
        } catch (error) {
            
            res.status(400).json(error)
            throw error

            
        }
         }         



}   
module.exports=PutHorarioFuncio;