const jwt = require('jsonwebtoken');
const {promisify} = require('util');
const users = require('../models/users');


module.exports ={
    eAdmin: async function (req, res, next) {
      const authHeader =   req.headers.authorization;

      try{
       
      if (!authHeader ){
        return res.status(400).json({
            erro:  true,
            mensagem: "Erro: necessário realizar o login  erro token"
        })
      }
      const [,token] = authHeader.split(' ');
      const decoded = await promisify(jwt.verify)(token, "V@lId@Ç^@70K3N#$%)(*!@#");
      const {id} = decoded;
    //  console.log(id)
      const eAdmin = await users.findOne({where: {email: id, situacao: 'A'} });
      if (!eAdmin) {
        return res.status(400).json({
            erro:  true,
            mensagem: "Erro: Usuário não tem permissão para acessar o recurso"
            })
            }
            

               
              return next();
             // console.log("decoded: ", decoded);
          }catch(err){
              
                  return res.status(400).json({
                      erro:  true,
                      mensagem: "Erro: necessário realizar o login  errp token invalido ou vencido" 
               });
          }
         

        }
         

    }

 