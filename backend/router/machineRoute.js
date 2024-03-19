const express = require("express");
const {
  userVerification,
  adminVerification,
} = require("../middleware/authMiddleware");
const {
  updateMachineController,
  CreateMachineController,
  allMachineController,
  deleteMachineController,
  allMachineCityWiseController,
} = require("../controllers/MachineController");

const router = express.Router();

//ROUTING
router.route("/create-machine").post(userVerification, CreateMachineController);

router
  .route("/update-machine/:id")
  .put(userVerification, updateMachineController);

router.route("/get-all-machine").get(userVerification, allMachineController);
router
  .route("/get-all-machine-citywise/:city")
  .get(userVerification, allMachineCityWiseController);

router
  .route("/delete-machine/:id")
  .delete(userVerification, adminVerification, deleteMachineController);

module.exports = router;
