const express = require("express");
const {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
} = require("../controllers/authController");
const {
  userVerification,
  adminVerification,
} = require("../middleware/authMiddleware");

//ROUTER OBJECT
const router = express.Router();

//ROUTING
router.post("/register", registerController);
router.post("/login", loginController);
router.get("/test", userVerification, adminVerification, testController);
router.route("/forgot-password").post(forgotPasswordController)

//PROTECTED ROUTE FOR USER
router.route("/user-auth").get(userVerification, (req, res) => {
  res.status(200).send({ ok: true });
});

//PROTECTED ROUTE FOR ADMIN
router.route("/admin-auth").get(userVerification, adminVerification, (req, res) => {
  res.status(200).send({ ok: true });
});

module.exports = router;
