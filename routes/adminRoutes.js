const { Router } = require("express");
const passport = require("passport");
const {
  register,
  login,
  showAdminData,
  findByIdAndRemove
  // fetchUserFromGoogle,
  // fetchUserFromFacebook
} = require("../controllers/adminController");

const router = Router();

router.post("/register", register);

router.post("/login",passport.authenticate("local", { session: false }),login);

router.get("/profile",passport.authenticate("jwt", { session: false }),showAdminData);

// router.delete('/:adminId', passport.authenticate('jwt', { session: false }),findByIdAndRemove);

// router.get(
//   "/google",
//   passport.authenticate("google", {
//     session: false,
//     scope: ["profile", "email"]
//   })
// );

// router.get(
//   "/google/redirect",
//   passport.authenticate("google", {
//     session: false,
//     failureRedirect: "http://localhost:1234/#login"
//   }),
//   fetchUserFromGoogle
// );

// router.get(
//   "/facebook",
//   passport.authenticate("facebook", {
//     session: false,
//     scope: ["email"]
//   })
// );

// router.get(
//   "/facebook/redirect",
//   passport.authenticate("facebook", {
//     session: false,
//     failureRedirect: "http://localhost:1234/#login"
//   }),
//   fetchUserFromFacebook
// );

module.exports = router;
