const { Router } = require("express");
const {
  register,
  login,
  getUser,
  updateUser,
  deleteUser,
  forgotPassword,
  accountActivation

} = require("../controllers/userController");

const {auth } = require("../middleware/authenticate")

const router = Router();

router.post("/register", register);

router.get(`/:activationToken`, accountActivation) 

router.get('/:userid',auth, getUser);

router.patch('/:userid',auth, updateUser);

router.delete('/:userid',auth, deleteUser);

router.post("/login", login);

router.get("/profile",auth, getUser);

router.post("/forgotPassword", forgotPassword);

module.exports = router; 
