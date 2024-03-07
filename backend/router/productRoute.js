const express = require("express");
const { userVerification, adminVerification } = require("../middleware/authMiddleware");
const { createProductController, getProductController, getSingleProductController, productImageController, deleteProductController, updateProductController, productFilterController, productCountController, productListController, searchProductController } = require("../controllers/productController");
const formidable = require("express-formidable")

const router = express.Router();

//ROUTING
router.route("/create-product").post(userVerification,formidable(), adminVerification, createProductController)

router.get("/get-product",getProductController)

router.get("/get-single-product/:slug",getSingleProductController)

router.get("/product-image/:id",productImageController);

router.delete("/delete-product/:id", userVerification, adminVerification, deleteProductController);

router.route("/update-product/:id").put(userVerification,formidable(), adminVerification, updateProductController)

router.post("/filter-product",productFilterController )

//products count
router.get("/product-count", productCountController)

router.get("/product-list/:page", productListController)
router.get("/search/:keywords", searchProductController)

module.exports = router;