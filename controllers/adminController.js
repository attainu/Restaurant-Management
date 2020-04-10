const jwt = require('jsonwebtoken')
const { hash, compare } = require("bcryptjs")
const Joi = require("@hapi/joi");
const { sendMailToAdmin, forgotPasswordmailToAdmin } = require("../utils/nodeMailer")
const Admin = require("../models/Admin");

module.exports = {
  
async register(req, res) {
  try {
    const { name, email, password, } = req.body
    const AdminInfo = Joi.object({
      name: Joi.string().min(4).max(22).required(),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
      password: Joi.string().min(3).max(8).required()
    })
    const { error, result } = AdminInfo.validate({ name: name, email: email, password: password })
    if (error) return res.status(422).json({ Error: error.message })

    const emailCheck = await Admin.findOne({ email: req.body.email })
    console.log(`EmailCheck From line 21 Admin controller :${emailCheck}`)
    if (emailCheck) return res.send("invalid request, Already Exists");
    const activationToken = jwt.sign({ id: Math.random() }, process.env.TEMP_TOKEN_SECRET, { expiresIn: 1000 * 1000 * 60 })
    const admin = await new Admin({ ...req.body});
    console.log(`Admin from line no 25 :${admin}`)
    const hashedPassword = await hash(req.body.password, 10);
    // console.log(admin,activationToken,hashedPassword)
    if (!admin) return res.send("invalid request")
    // admin.password = hashedPassword;
    admin.activationToken = activationToken;
    admin.save()
    sendMailToAdmin(admin.name, admin.email, activationToken);
    res.status(202).json({
        res:`${req.body.name}'s THE Admin account registered Successfully`,
        message:"EMAIL SEND SUCCESSFULLY GO THERE AND ACTIVATE YOUR ACCOUNT TO AVAIL THE BENEFITS.."
      })
      console.log("EMAIL SEND SUCCESSFULLY GO THERE AND ACTIVATE YOUR ACCOUNT TO AVAIL THE BENEFITS..")
  }
  catch (err) {
      return res.status(400).send(`Validation Error: ${err.message}`);
  }
},

//======================================================================


    async accountActivation(req, res) {
        try {
            if (!req.query.admin) throw new Error("invalid route")

            else if (req.query.admin === "Job-Provider") var schema = JobProviderDetails
            else if (req.query.admin === "Job-Seeker") var schema = JobSeekerDetails;
            else throw new Error("invalid route")
            if (!req.params.activationtoken) return res.status(401)
            const payload = await jwt.verify(req.params.activationtoken, process.env.TEMP_TOKEN_SECRET);
            if (payload) {
                const updated = await schema.findOneAndUpdate( {activationToken: req.params.activationtoken},{ isVerified: true, activationToken: null })               
                if (updated) return res.status(202).send("Account activated Successfully.");
                return res.send("Account already activated")
            }
            return res.send("Invalid Token")
        }
        catch (err) {
            console.log(err)
            res.status(500).send(err)
        }
    } ,

//======================================================================


  async deleteAdmin(req, res, next) {
    const id = req.params.adminId;
    if(id){
    Admin
    .findByIdAndRemove(id, req.body)
        .exec()
        .then(admin => 
            res.status(200).json(admin) )
        .catch(err => next(err));
}else{
        res.status(400).json({
            message: 'sorry! Bad Request! Try Again'
        });
    }
  },

  //-----------------------------------------------

  async showAdminData(req, res, next) {
    const id = req.params.adminId;
    if(id){
    Admin
        .findById(id)
        .exec()
        .then(admin => {
            console.log(admin),
            res.status(200).json(admin)} )
        .catch(err => next(err));
}else{
        res.status(400).json({
            message: 'sorry! Bad Request! Try Again'
        });
    }
  },

//-----------------------------------------------

  async Admin_updated(req,res,next){
    const id = req.params.adminId;
    if(id){
    Admin
    .findByIdAndUpdate(id, req.body)
        .exec()
        .then(admin => 
            res.status(200).json(admin) )
        .catch(err => next(err));
}else{
        res.status(400).json({
            message: 'sorry! Bad Request! Try Again'
        });
    }
},


// -------------------------------admin Login---------------------
async login(req, res) {
  try {
    var email = req.body.email;
    var password = req.body.password;
    if (!email || !password)
      return res.status(400).send("Incorrect credentials");

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).send("Incorrect credentials");
    const isMatched = compare(password, admin.password);
    if (!isMatched) throw new Error("Invalid credentials");
    if (!admin.isVerified) return res.status(401).send("You are not verified, please activate link sent to you through Email");

    console.log(admin)
    const token = await jwt.sign({ _id: admin._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 1000 * 600 * 100 })
    admin.jwt = token;
    admin.save()
    return res.status(202).send({ token })
  }
  catch (err) {
    return res.status(500).send(err.message)
  }
},

  // --------------------------- Forgot Password -------------------------
  async forgotPassword(req, res) {
    try {
     
      const admin = await Admin.findOne({ email: req.body.email, isVerified: true });
      console.log(admin)
      if (!admin) return res.send("Incorrect Credentials or haven't activated the account, activate through email ")
      const rawPassword = (Math.floor(Math.random() * 100000000)).toString();
      const hashedPassword = await hash(rawPassword, 10)
      admin.password = hashedPassword;
      admin.save();
      forgotPasswordmailToAdmin(req.body.email, rawPassword)
      return res.status(202).send("password sent to your mail, make your registration done.")
    } catch (err) {
      return res.status(500).send(err.message)
    }
  }

};