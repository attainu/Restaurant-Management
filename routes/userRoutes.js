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

const {authAdmin } = require("../middleware/authenticate")

const router = Router();

router.post("/register", register);

router.get(`/:activationToken`, accountActivation) 

router.get('/:userid',authAdmin, getUser);

router.put('/:userid',authAdmin, updateUser);

router.delete('/:userid',authAdmin, deleteUser);

router.post("/login", login);

router.get("/profile",authAdmin, getUser);

router.post("/forgotPassword", forgotPassword);

module.exports = router; 
