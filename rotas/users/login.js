const users = require('../../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//const  AsyncStorage = require  ('@react-native-async-storage/async-storage');


const LoginUsers = async (req, res) => {
  const { email, senha } = req.body;

 

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

    

    if (!(bcrypt.compareSync(req.body.senha, user.senha))) {
      return res.status(400).json({
        erro: true,
        mensagem: 'Usuário ou senha inválida2'
      });
    }

    const token = jwt.sign({ id:[ user.email, user.nome, user.especialidade ]}, "V@lId@Ç^@70K3N#$%)(*!@#", {
      expiresIn: '7d'
    });

    //token =  req.headers.authorization

    let telasRenderizada = '';


      if (user.especialidade === "psicologaGLP" || "psicologaMatriz") {
        telasRenderizada = 'UserPsicologa'
        } else if (user.especialidade === "massoterapiaGLP" || "massoterapiaMatriz") {
          telasRenderizada = 'UserPsicologa'
}
    
  
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
