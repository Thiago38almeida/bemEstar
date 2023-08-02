const Agendamento = require('../../models/agendamento')
const { Op } = require('sequelize')

const Agendamentos = async (req, res) => {
  const  servicoId  = req.params.user;

  try {
    const agendamentos = await Agendamento.findAll({
      where: {
        servicoId: {
          [Op.startsWith]: servicoId
        }
       
      }
    });

    return res.status(200).json(
      agendamentos
)




  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocorreu um erro ao buscar os agendamentos.' });
  }
};

module.exports = Agendamentos;
