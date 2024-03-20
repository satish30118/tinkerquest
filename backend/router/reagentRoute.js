const express = require("express");
const { userVerification, adminVerification } = require("../middleware/authMiddleware");
const { deleteReagentController, CreateReagentController, updateReagentController, allReagentController, singleReagentController, allReagentCityController } = require("../controllers/ReagentController");


const router = express.Router();


//ROUTING
router.route("/create-reagent").post(userVerification, CreateReagentController);

router.route("/update-reagent/:id").put(userVerification,  updateReagentController)

router.route("/get-all-reagent").get(userVerification, adminVerification, allReagentController)
router.route("/get-all-reagent-citywise/:city").get(userVerification, allReagentCityController)

router.route("/delete-reagent/:id").delete(userVerification, adminVerification, deleteReagentController)

router.route("/get-single-reagent/:id").get(userVerification,  singleReagentController)

module.exports = router;