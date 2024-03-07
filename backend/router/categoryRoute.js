const express = require("express");
const { userVerification, adminVerification } = require("../middleware/authMiddleware");
const { CreateCategoryController, updateCategoryController, categoryController, singleCategoryController, deleteCategoryController } = require("../controllers/categoryController");
const router = express.Router();


//ROUTING
router.route("/create-category").post(userVerification, adminVerification,CreateCategoryController);

router.route("/update-category/:id").put(userVerification, adminVerification, updateCategoryController)

router.route("/show-all-category").get(categoryController)

router.route("/single-category/:slug").get(singleCategoryController)

router.route("/delete-category/:id").delete(userVerification, adminVerification, deleteCategoryController)


module.exports = router;