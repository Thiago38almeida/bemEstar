const {servico} = require('../../models/servico');

const CadastrarServico = async (req, res) => {
    const dados = req.body;

    servico.create(dados)
    .then((servico) => {
        res.json(servico);
        })
        .catch((error) => {
        
            res.json(error);
            });


}

module.exports = CadastrarServico;