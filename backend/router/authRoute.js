const express = require("express");
const {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  getAllUser,
  updateUser,
  deleteUser,
} = require("../controllers/authController");
const {
  userVerification,
  adminVerification,
} = require("../middleware/authMiddleware");
const { emailVerification, sendOTP } = require("../nodemailer/userMail");

//ROUTER OBJECT
const router = express.Router();

//ROUTING
router.post("/register", registerController);
router.post("/send-otp", sendOTP);
router.post("/verify-otp", emailVerification);
router.post("/login", loginController);
router.get("/test", userVerification, adminVerification, testController);
router.get("/get-all-user", userVerification, getAllUser);
router.delete(
  "/delete-user/:id",
  userVerification,
  adminVerification,
  deleteUser
);
router.put("/update-user/:id", userVerification, adminVerification, updateUser);
router.route("/forgot-password").post(forgotPasswordController);

//PROTECTED ROUTE FOR USER
router.route("/user-auth").get(userVerification, (req, res) => {
  res.status(200).send({ ok: true });
});

//PROTECTED ROUTE FOR ADMIN
router
  .route("/admin-auth")
  .get(userVerification, adminVerification, (req, res) => {
    res.status(200).send({ ok: true });
  });

module.exports = router;
