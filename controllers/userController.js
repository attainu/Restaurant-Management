const User = require("../models/User");

module.exports = {
  async register(req, res) {
    try {
      const { email, name, password } = req.body;
      if (!email || !name || !password) {
        return res
          .status(400)
          .send({ statusCode: 400, message: "Bad request" });
      }
     
      const user = await User.create({
        email,
        name,
        password,
        isThirdPartyUser: false
      });
      const accessToken = await user.generateToken();
      res.status(201).json({
        Message:`user ${(user.name)} registration successfull`,
        statusCode: 201,
        user,
        accessToken: `JWT ${accessToken}`,
        expiresIn: "12h"
      });
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  },

  async getUser(req, res, next) {
    const {
      userid
    } = req.params;
    if (userid)  {
      User
        .findById(userid)
        .exec()
        .then(user => res.json(user))
        .catch(e => next(e));
    } else {
      User
        .find()
        .exec()
        .then(user => res.json(user))
        .catch(e => next(e));
    }
  },

  async updateUser(req, res, next) {
    res.status(200).json({
      message:'user updated'
    })
  },

  async deleteUser(req, res, next) {
    res.status(200).json({
      message:'user deleted'
    })
  },

  async login(req, res) {
    const user = req.user;
    const accessToken = await user.generateToken();
    res.json({
      Message:`welcome ${user.name} `,
      statusCode: 200,
      user,
      accessToken: `JWT ${accessToken}`,
      expiresIn: "12h"
    });
  },

  async showUserData(req, res) {
    res.json({
      Greet:`WELCOME ${req.user.name} `,
      user: req.user 
    });
  },

//   async fetchUserFromGoogle(req, res) {
//     const user = req.user;
//     const accessToken = await user.generateToken();
//     // Send the token as a cookie ..
//     res.cookie("accessToken", accessToken, {
//       expires: new Date(Date.now() + 1000 * 60 * 60 * 12),
//       httpOnly: true,
//       sameSite: "none"
//     });
//     // Redirect
//     res.redirect("http://localhost:1234/#dashboard");
//   },

//   async fetchUserFromFacebook(req, res) {
//     const user = req.user;
//     const accessToken = await user.generateToken();
//     // Send the token as a cookie ..
//     res.cookie("accessToken", accessToken, {
//       expires: new Date(Date.now() + 1000 * 60 * 60 * 12),
//       httpOnly: true,
//       sameSite: "none"
//     });
//     // Redirect
//     res.redirect("http://localhost:1234/#dashboard");
//   }
 };
