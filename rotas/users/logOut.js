//const sessionStorage = require('s')

const LogOutUsers = async (req, res) => {

    try {
        //Limpe os cookies de autenticação
        res.clearCookie('login');
       // req.session.destroy();
      
        // Envie uma resposta indicando que o logout foi realizado com sucesso
        res.json({ message: 'Logout realizado com sucesso!' });
  
    }
    catch (error){
        console.log("Error in log out user", error);
        return res
        .status(500)
        .json({ message: "Internal Server Error" });
        };




}
module.exports = LogOutUsers;