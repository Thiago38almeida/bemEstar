const { Op } = require('sequelize');
const horarioFuncionamento = require('../../models/horariosServico');
const moment = require('moment')
//const GethorarioFuncionamento = require('./getHorarioFuncionamento');


const horarioDisponivel = async (req, res) => {
    const dados = req.body;

try {
    /*
    const response = await horarioFuncionamento.findAll({
        where: {
        especialidade: dados.especialidade,
       // colaboradorId: dados.colaboradorId ,
        dias: {
            [Op.like]: `%${dados.dias}%`
        } ,
        servicoId: dados.colaboradorId.toString()}})

    //console.log(response.length)


        if(response.length > 0){
            res.json({mensagem: 'já possui um horario cadastrado', status: 201})
        }
        else{
            const horarios = await horarioFuncionamento.create(dados);
            return res.json(horarios);
        }
*/
        const horarios = await horarioFuncionamento.create(dados);
            return res.json(horarios);

   // console.log(response.length)
    
} catch (error) {
    console.log(error)
    return res.status(500).json({error: 'erro interno no servidor', error})

    
}

}

module.exports = horarioDisponivel;