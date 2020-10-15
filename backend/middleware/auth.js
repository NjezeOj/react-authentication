const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtSecret = process.env.jwtSecret

module.exports = function(req, res, next){
    try{
        const token = req.header('x-auth-token');
        const verifiedUser = jwt.verify(
            token,
            jwtSecret
        )
        req.user = verifiedUser.user;
        next();
    }catch(error){
        console.log(error.message)
        return res.status(500).json({msg: "Server Error..."});
    }
}