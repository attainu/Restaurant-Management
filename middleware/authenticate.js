const jwt = require("jsonwebtoken");
var AdminDetails = require("../models/Admin");

module.exports = {

async authAdmin (req,res,next){
    try {
        const token = req.header('Authorization')
        if (!token) return res.sendStatus(401)
        const JWT = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        console.log("Admin JWT  = ", JWT)
        if (!JWT._id) {
            return res.sendStatus(403).json({
                Message: "try again"
            })
        }
        const admin = await AdminDetails.findOne({_id: JWT._id, jwt: token})
        if(!admin) return res.sendStatus(401)
        req.admin = admin
        next()
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

}