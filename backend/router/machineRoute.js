const express = require("express");
const { userVerification, adminVerification } = require("../middleware/authMiddleware");
const { updateMachineController, CreateMachineController, allMachineController, deleteMachineController } = require("../controllers/MachineController");

const router = express.Router();


//ROUTING
router.route("/create-machine").post(userVerification, adminVerification,CreateMachineController);

router.route("/update-machine/:id").put(userVerification, adminVerification, updateMachineController)

router.route("/get-all-machine").get(userVerification,allMachineController)

router.route("/delete-machine/:id").delete(userVerification, adminVerification, deleteMachineController)


module.exports = router;