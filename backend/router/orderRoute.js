const express = require("express");
const { userVerification, adminVerification } = require("../middleware/authMiddleware");

const { createMachineOrderController, allMachineOrderController, updateMachineOrderController, deleteMachineOrderController, singleMachineOrderController, allMachineOrderCityWiseController } = require("../controllers/MachineOrderController");

const { createReagentOrderController, allReagentOrderController, updateReagentOrderController, deleteReagentOrderController, singleReagentOrderController, allReagentOrderCityWiseController } = require("../controllers/ReagentOrderController");


const router = express.Router();


//ROUTING MACHINE ORDER
router.route("/order-machine").post(userVerification, adminVerification,createMachineOrderController);
router.route("/get-order-machine").get(userVerification, allMachineOrderController);
router.route("/get-order-machine-citywise/:city").get(userVerification, allMachineOrderCityWiseController);
router.route("/update-order-machine/:id").put(userVerification, updateMachineOrderController);
router.route("/get-single-machine/:id").get(userVerification, singleMachineOrderController);
router.route("/delete-order-machine/:id").delete(userVerification, adminVerification,deleteMachineOrderController);

//
//ROUTING REAGENT ORDER
router.route("/order-reagent").post(userVerification, adminVerification,createReagentOrderController);
router.route("/get-order-reagent").get(userVerification, allReagentOrderController);
router.route("/get-order-reagent-citywise/:city").get(userVerification, allReagentOrderCityWiseController);
router.route("/update-order-reagent/:id").put(userVerification, updateReagentOrderController);
router.route("/get-single-reagent/:id").get(userVerification, singleReagentOrderController);
router.route("/delete-order-reagent/:id").delete(userVerification, adminVerification,deleteReagentOrderController);





module.exports = router;