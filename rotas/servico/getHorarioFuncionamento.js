//const { where } = require('sequelize');
const { Op } = require('sequelize');
const horarioFuncionamento = require('../../models/horariosServico');


const GethorarioFuncionamento = async (req, res) => {

    const especialidade = req.params.especialidade;
    const colaboradorId = req.params.colaboradorId;

    console.log(especialidade, colaboradorId)

    try{
    const response = await horarioFuncionamento.findAll({
        attributes : ['id','dias', 'inicio','fim'],
        where: {
            colaboradorId:{
                [Op.like]: `%${colaboradorId}%`
            } 
        },

     
    })
    res.status(200).json(response)
  
}
catch(err){
    console.log("Erro ao buscar os dados do Horário de funcionamento", err);
    return res
    .status(500)
    .send(`Ocorreu um erro interno: ${err}`);
    };
    };
    module.exports=GethorarioFuncionamento;
    
