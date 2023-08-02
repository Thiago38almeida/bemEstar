
const users = require('../../models/users')
const bcrypt = require('bcryptjs')


const CreateUsers =  async ( req,res) => {
    const dados = req.body

    dados.senha =  bcrypt.hashSync(dados.senha,8);

    await users.create(dados)
    .then(()=> {
        res.status(201).json({
            message: "Usuário criado com sucesso"
            })
     })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: 'erro interno no servidor', err})
    })
}

module.exports= CreateUsers;