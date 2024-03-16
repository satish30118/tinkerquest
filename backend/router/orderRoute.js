const express = require("express");
const { userVerification, adminVerification } = require("../middleware/authMiddleware");

const { createMachineOrderController, allMachineOrderController, updateMachineOrderController, deleteMachineOrderController } = require("../controllers/MachineOrderController");

const { createReagentOrderController, allReagentOrderController, updateReagentOrderController, deleteReagentOrderController } = require("../controllers/ReagentOrderController");


const router = express.Router();


//ROUTING MACHINE ORDER
router.route("/order-machine").post(userVerification, adminVerification,createMachineOrderController);
router.route("/get-order-machine").get(userVerification, adminVerification,allMachineOrderController);
router.route("/update-order-machine/:id").put(userVerification, adminVerification,updateMachineOrderController);
router.route("/delete-order-machine/:id").delete(userVerification, adminVerification,deleteMachineOrderController);

//
//ROUTING REAGENT ORDER
router.route("/order-reagent").post(userVerification, adminVerification,createReagentOrderController);
router.route("/get-order-reagent").get(userVerification, adminVerification,allReagentOrderController);
router.route("/update-order-reagent/:id").put(userVerification, adminVerification,updateReagentOrderController);
router.route("/delete-order-reagent/:id").delete(userVerification, adminVerification,deleteReagentOrderController);





module.exports = router;