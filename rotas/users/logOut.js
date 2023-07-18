const { TokenExpiredError } = require("jsonwebtoken");

const LogOutUsers = async (req, res) => {

    try {
        const token = req.body;

        TokenExpiredError

        
       
    }
    catch (error){
        console.log("Error in log out user", error);
        return res
        .status(500)
        .json({ message: "Internal Server Error" });
        };




}
module.exports = LogOutUsers;