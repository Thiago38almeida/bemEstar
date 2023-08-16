const verificarHorarioDisponivel = require('./rotas/agendamento/getHoras');
const Agendar = require('./rotas/agendamento/agendaPost');
const Agendamentos = require('./rotas/agendamento/agendas');
const AgendamentosID = require('./rotas/agendamento/agendaGetId');
const CreateUsers = require('./rotas/users/users');
const  LoginUsers = require('./rotas/users/login')
const { eAdmin } = require('./middleware/auth');
const CadastrarServico = require('./rotas/servico/cadastrarServico');
const horarioDisponivel = require('./rotas/servico/horariosFuncionamento');
const Getservico = require('./rotas/servico/getServicos');
const LogOutUsers = require('./rotas/users/logOut');
const DeleteAgendas = require('./rotas/agendamento/agendaDel');
const AgendasUpdate = require('./rotas/agendamento/agendaUp');
const Agendas_h = require('./rotas/agendamento/agendaH');
const GethorarioFuncionamento = require('./rotas/servico/getHorarioFuncionamento');
const PutHorarioFuncio = require('./rotas/servico/PUTservico');
const express = require('express');
const GetUsers = require('./rotas/users/getUsers');


const router = express.Router();

//rotas privadas
router.get('/agendas/:especialidade/:user',eAdmin, Agendamentos)
router.get('/agendash/:especialidade/:user', eAdmin, Agendas_h)
router.get('/agendas/:id',AgendamentosID )
router.get('/horarioFuncionamento/:especialidade/:colaboradorId', eAdmin,GethorarioFuncionamento )
router.get('/admin/users',GetUsers )
//post
router.post('/criar', CreateUsers)
router.post('/criarServico', CadastrarServico)
router.post('/getservico', Getservico)
router.post('/criarHorarioServico', horarioDisponivel)

//put
router.put('/update/:id',eAdmin, AgendasUpdate)
router.put('/horarioFuncio',eAdmin, PutHorarioFuncio)
router.put('/Reagendar/:id', AgendasUpdate)
//delete
router.delete('/deleteAgendamento/:id', eAdmin, DeleteAgendas)
router.delete('/delAgendamento/:id', DeleteAgendas)

//Rotas Publicas
router.post('/horariosDisponivies', verificarHorarioDisponivel)
router.post('/agendar', Agendar)
//Login
router.post('/login', LoginUsers)
router.post('/logout', LogOutUsers)

module.exports= router;