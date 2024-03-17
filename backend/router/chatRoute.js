const express = require("express");
const {
  userVerification,
  adminVerification,
} = require("../middleware/authMiddleware");
const {
  allChatController,
  CreateChatController,
} = require("../controllers/chatController");

const router = express.Router();

//ROUTING
router.route("/create-chat").post(userVerification, CreateChatController);

router.route("/get-all-chat").get(userVerification, allChatController);

module.exports = router;
