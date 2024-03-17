const express = require("express");
const { userVerification, adminVerification } = require("../middleware/authMiddleware");
const { deleteReagentController, CreateReagentController, updateReagentController, allReagentController, singleReagentController } = require("../controllers/ReagentController");


const router = express.Router();


//ROUTING
router.route("/create-reagent").post(userVerification, adminVerification,CreateReagentController);

router.route("/update-reagent/:id").put(userVerification, adminVerification, updateReagentController)

router.route("/get-all-reagent").get(userVerification, allReagentController)

router.route("/delete-reagent/:id").delete(userVerification, adminVerification, deleteReagentController)

router.route("/get-single-reagent/:id").get(userVerification, adminVerification, singleReagentController)

module.exports = router;