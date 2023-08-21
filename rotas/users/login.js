const users = require('../../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//const  AsyncStorage = require  ('@react-native-async-storage/async-storage');


const LoginUsers = async (req, res) => {
  const { email, senha } = req.body;

 // console.log(email, senha)

  try {
    const user = await users.findOne({
      attributes: ['nome', 'email', 'senha', 'especialidade', 'situacao'],
      where: {
        email: email,
        situacao: 'A'
      }
    });

    if (!user) {
      return res.status(400).json({
        erro: true,
        mensagem: 'Usuário ou senha inválida1'
      });
    }

    
/*
    if (!(bcrypt.compareSync(senha, user.senha))) {
      return res.status(400).json({
        erro: true,
        mensagem: 'Usuário ou senha inválida2'
      });
    }*/

    const token = jwt.sign({ id:[ user.email, user.nome, user.especialidade ]}, "V@lId@Ç^@70K3N#$%)(*!@#", {
      algorithm: 'HS256',
      expiresIn: '24h'
    });

     
    //token =  req.headers.authorization

    let telasRenderizada = '';

    switch (user.nome) {
      case "psicologaGLP":
        telasRenderizada = 'UserPsicologa'
        
        break;
        case "psicologaMatriz":
          telasRenderizada = 'UserPsicologa'
          
          break;
          case "massoterapiaGLP":
            telasRenderizada = 'UserMasso'
            
            break;
            case "massoterapiaMatriz":
              telasRenderizada = 'UserMasso'
              
              break;
    
      default:
        break;
    }
/*
      if (user.nome === "psicologaGLP" || "psicologaMatriz") {
        telasRenderizada = 'UserMasso'
        } 
        else if (user.nome === "massoterapiaGLP" || "massoterapiaMatriz") {
          telasRenderizada = 'UserMasso'
}*/

//console.log(telasRenderizada)
    
  
    return res.json({
      erro: false,
      mensagem: 'Login com sucesso',
      token,
      especialidade: user.especialidade,
      user: user.nome,
      telasRenderizada,
      status: "200"
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      erro: true,
      mensagem: 'Erro ao realizar login'
    });
  }

}

module.exports = LoginUsers;
