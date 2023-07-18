const Agendamento = require("../../models/agendamento");


const DeleteAgendas = async (req, res) => {
    try{
        const agendaId= req.params.id;
        console.log(agendaId)
       const request =  await Agendamento.destroy({
            where: {
              id: agendaId
            }
        })
        console.log(request)
        return res.status(204).json(request)
        }catch(err){
            console.log("Error in deleting the agenda", err);
            return  res.status(500).send();
            };



}

module.exports = DeleteAgendas;