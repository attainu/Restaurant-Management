const { Router } = require("express");
const passport = require("passport");
const {
  register,
  login,
  showUserData,
  getUser,
  updateUser,
  deleteUser
  // fetchUserFromGoogle,
  // fetchUserFromFacebook
} = require("../controllers/userController");

const router = Router();

router.post("/register", register);

router.get('/:userid', getUser);

router.put('/:userid', updateUser);

router.delete('/:userid', deleteUser);

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  login
);

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  showUserData
);

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
