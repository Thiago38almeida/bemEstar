
const users = require('../../models/users')
const bcrypt = require('bcryptjs')


const GetUsers =  async ( req,res) => {
    
    try {

    const resp = await users.findAll()

    res.status(200).json(resp)
        
    } catch (err) {

        
        console.log(err)
        res.status(500).json({error: 'erro interno no servidor', err})

        
    }
    
}

module.exports= GetUsers;