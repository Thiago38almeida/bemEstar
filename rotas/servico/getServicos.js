const {servico} = require('../../models/servico')
const {Op} = require('sequelize')


const Getservico = async (req, res) => {
    const {servicoId} = req.body;
  
  
    await servico.findAll({
      attributes: 
        ['servicoId', 'duracao'],
      
           where: {
                servicoId: {
                  [Op.startsWith]: servicoId
                } 
                }
        }).then( servicos => {
          //console.log(servicos)
        return  res.json(servicos)
        }).catch(error =>  { 
         // console.log(error)
       res.status(500).json({ error: 'Ocorreu um erro ao buscar os serviços.', error });
        })
  };
  
module.exports = Getservico;