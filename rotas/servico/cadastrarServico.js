const {servico} = require('../../models/servico');

const CadastrarServico = async (req, res) => {
    const dados = req.body;

    servico.create(dados)
    .then((servico) => {
        res.status(200).json(servico);
        })
        .catch((error) => {
        
            res.status(400).json({error: 'erro interno no servidor',error});
            });


}

module.exports = CadastrarServico;