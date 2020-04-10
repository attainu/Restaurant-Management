const jwt = require('jsonwebtoken')
const { hash, compare } = require("bcryptjs")
const Joi = require("@hapi/joi");
const { sendMailToUser, forgotPasswordmailToUser } = require("../utils/nodeMailer")
const User = require("../models/User");

module.exports = {
  async register(req, res) {
    try {
      const { name, email, password, } = req.body
      const userInfo = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi.string().min(3).max(8).required()
      })
      const { error, result } = userInfo.validate({ name: name, email: email, password: password })
      if (error) return res.status(422).json({ Erro: error.message })
  
      const emailCheck = await User.findOne({ email: req.body.email })
      console.log(`EmailCheck From line 20 user controller :${emailCheck}`)
      if (emailCheck) return res.send("invalid request, Already Exists");
      const activationToken = await jwt.sign({ id: Math.random() }, process.env.TEMP_TOKEN_SECRET, { expiresIn: 1000 * 1000 * 60 })
      const user = await new User({ ...req.body });
      console.log(`user from line no 24 :${user}`)
      const hashedPassword = await hash(req.body.password, 10);
      if (!user) return res.send("invalid request")
      // user.password = hashedPassword;
      user.activationToken = activationToken;
      user.save()
      sendMailToUser(user.name, user.email, activationToken);
      res.status(202).json({
        res:`${req.body.name}'s account registered Successfully`,
        message:"EMAIL SEND SUCCESSFULLY GO THERE AND ACTIVATE YOUR ACCOUNT TO AVAIL THE BENEFITS.."
          });
      console.log("EMAIL SEND SUCCESSFULLY GO THERE AND ACTIVATE YOUR ACCOUNT TO AVAIL THE BENEFITS..")
    }
    catch (err) {
        return res.status(400).send(`Validation Error line 38: ${err.message}`);
    }
  },

  // -------------------------------user Login---------------------
  async login(req, res) {
    try {
      var email = req.body.email;
      var password = req.body.password;
      if (!email || !password)
        return res.status(400).send("Incorrect credentials");
  
      const user = await User.findOne({ email });
      if (!user) return res.status(400).send("Incorrect credentials");
      const isMatched = compare(password, user.password);
      if (!isMatched) throw new Error("Invalid credentials");
      if (!user.isVerified) return res.status(401).send("You are not verified, please activate link sent to you through Email");
  
      console.log(user)
      const token = await jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 1000 * 600 * 100 })
      user.jwt = token;
      user.save()
      return res.status(202).send({ token })
    }
    catch (err) {
      return res.status(500).send(err.message)
    }
  },
  //----------------------------------------------------------------------

  async accountActivation(req, res) {
    try {
         if (!req.query.user) throw new Error("invalid route")
        if (!req.params.activationToken) return res.status(401)
        const payload = await jwt.verify(req.params.activationToken, process.env.TOKEN_KEY);
        if (payload) {
            const updated = await User.findOneAndUpdate( {activationToken: req.params.activationToken},{ isVerified: true, activationToken: null })               
            if (updated) return res.status(202).send("Account activated Successfully.Now onward you can order something");
            else return res.send("Account already activated")
        }
        return res.send("Invalid Token")
    }
    catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
} ,



    // --------------------------- Forgot Password to send OTP -------------------------
    async forgotPassword(req, res) {
      try {
        
        const user = await User.findOne({ email: req.body.email, isVerified: true });
        console.log(user)
        if (!user) return res.send("Incorrect Credentials or haven't activated the account, activate through email ")
        const rawPassword = (Math.floor(Math.random() * 100000000)).toString();
        const hashedPassword = await hash(rawPassword, 10)
        user.password = hashedPassword;
        user.save();
        forgotPasswordmailToUser(req.body.email, rawPassword)
        return res.status(202).send("password has been sent to your email successfully.Use That Properly")
      } catch (err) {
        return res.status(500).send(err.message)
      }
    },

  async updateUser(req, res, next) {
    const id = req.params.userId;
    if(id){
    User
    .findByIdAndUpdate(id, req.body)
        .exec()
        .then(user => 
            res.status(200).json(user) )
        .catch(err => next(err));
}else{
        res.status(400).json({
            message: 'sorry! Bad Request! Try Again'
        });
    }
  },

  async deleteUser(req, res, next) {
    const id = req.params.userId;
    if(id){
    User
    .findByIdAndRemove(id, req.body)
        .exec()
        .then(user => 
            res.status(200).json(user) )
        .catch(err => next(err));
}else{
        res.status(400).json({
            message: 'sorry! Bad Request! Try Again'
        });
    }
  },

  async getUser(req, res) {
    const id = req.params.userId;
    if(id){
    User
        .findById(id)
        .exec()
        .then(user => {
            console.log(user),
            res.status(200).json(user)} )
        .catch(err => next(err));
}else{
        res.status(400).json({
            message: 'sorry! Bad Request! Try Again'
        });
    }
  },
 };
