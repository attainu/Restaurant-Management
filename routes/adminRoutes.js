const { Router } = require("express");
const {
  register,
  login,
  showAdminData,
  deleteAdmin,
  Admin_updated,
  forgotPassword  

} = require("../controllers/adminController");

const router = Router();

router.post("/register", register);

router.post("/login",login);

router.get("/:adminId",showAdminData);

router.delete('/:adminId',deleteAdmin);

router.patch('/:adminId',Admin_updated);

router.patch('/:adminId',forgotPassword);

module.exports = router;
