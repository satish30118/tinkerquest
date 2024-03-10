const express = require("express");
const { userVerification, adminVerification } = require("../middleware/authMiddleware");
const { CreateTestController, updateTestController, deleteTestController, allTestController, allTestCategoryController, allTestCountController } = require("../controllers/testController");
const router = express.Router();


//ROUTING
router.route("/create-test").post(userVerification, adminVerification,CreateTestController);

router.route("/update-test/:id").put(userVerification, adminVerification, updateTestController)

router.route("/all-test").get(userVerification, adminVerification,allTestController)

router.route("/all-test-count").get(userVerification, adminVerification,allTestCountController)

router.route("/all-test/category-wise/:category").get(userVerification, adminVerification,allTestCategoryController)


router.route("/delete-test/:id").delete(userVerification, adminVerification, deleteTestController)


module.exports = router;