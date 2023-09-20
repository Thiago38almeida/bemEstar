const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./router');
const schedule = require('node-cron');
const util = require('./rotas/services/util');
const cookieParser = require('cookie-parser');
const LembreteAgendamentos = require('./rotas/services/lembreteAgendas');




app.use(cors()); 
app.use(express.json());


var tarefa = schedule.schedule('21 16 * * *', () => {
    util.houseKeeping();
 });
 tarefa.start();
 app.use(cookieParser());

 // enviar email com 24h de antecedência de um atendimento
 var lembreteAgendamento = schedule.schedule('42 09 * * *', () => {
  console.log("Lembrete");
 
  LembreteAgendamentos();

 })
 lembreteAgendamento.start();

 app.get('/bemEstar', (req, res) => {
    // Define o cookie com o atributo "SameSite" e "Secure"
    res.cookie('login', 'valorDoCookie', {
      sameSite: 'None', // ou 'Strict' ou 'Lax' se necessário
      secure: true, // Certifique-se de estar usando HTTPS
    });
    res.send('Cookie configurado com SameSite=None e Secure.');

    next()
  } );

app.use('/bemEstar',router);




const PORT = process.env.PORT || 9091;

app.listen(PORT, () => {
    console.log(`Server running at PORT ${PORT}`);
});
