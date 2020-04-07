const { Router } = require("express");
const {
  register,
  login,
  getUser,
  updateUser,
  deleteUser,
  forgotPassword

} = require("../controllers/userController");

const router = Router();

router.post("/register", register);

router.get('/:userid', getUser);

router.put('/:userid', updateUser);

router.delete('/:userid', deleteUser);

router.post("/login", login);

router.get("/profile", getUser);

router.post("/forgotPassword", forgotPassword);

module.exports = router; 
