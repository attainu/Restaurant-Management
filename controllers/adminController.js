const Admin = require("../models/Admin");

module.exports = {
  async register(req, res) {
    try {
      const { email, name, password } = req.body;
      if (!email || !name || !password) {
        return res
          .status(400)
          .send({ statusCode: 400, message: "Bad request" });
      }
      // const admin = new admin({ ...req.body })
      // await admin.save()
      const admin = await Admin.create({
        email,
        name,
        password,
        isThirdPartyAdmin: false
      });
      const accessToken = await admin.generateToken();
      res.status(201).json({
        statusCode: 201,
        Message:`ADMIN ${admin.name} registration successfull`,
        admin,
        accessToken: `JWT ${accessToken}`,
        expiresIn: "12h"
      });
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  },

  async login(req, res) {
    const admin = req.user;
    const accessToken = await admin.generateToken();
      res.json({
      Message:`welcome ${admin.name} `,
      statusCode: 200,
      admin,
      accessToken: `JWT ${accessToken}`,
      expiresIn: "12h"
    }
    )
  },

  async showAdminData(req, res) {
    res.json({
      Greet:`WELCOME ${req.user.name} `,
      admin: req.user 
    });
  },

  // async findByIdAndRemove(req, res, next) {
  //   const {
  //     adminId
  //   } = req.params;
  
  //   Admin
  //     .findByIdAndRemove(adminId)
  //     .exec()
  //     .then(() => res.json({ success: true }))
  //     .catch(e => next(e));
  // },

  // async fetchAdminFromGoogle(req, res) {
  //   const admin = req.admin;
  //   const accessToken = await admin.generateToken();
  //   // Send the token as a cookie ..
  //   res.cookie("accessToken", accessToken, {
  //     expires: new Date(Date.now() + 1000 * 60 * 60 * 12),
  //     httpOnly: true,
  //     sameSite: "none"
  //   });
  //   // Redirect
  //   res.redirect("http://localhost:1234/#dashboard");
  // },

  // async fetchAdminFromFacebook(req, res) {
  //   const admin = req.admin;
  //   const accessToken = await admin.generateToken();
  //   // Send the token as a cookie ..
  //   res.cookie("accessToken", accessToken, {
  //     expires: new Date(Date.now() + 1000 * 60 * 60 * 12),
  //     httpOnly: true,
  //     sameSite: "none"
  //   });
  //   // Redirect
  //   res.redirect("http://localhost:1234/#dashboard");
  // }
};
