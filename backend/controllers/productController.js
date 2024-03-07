const fs = require("fs");
const productModel = require("../models/productModel");
const { default: slugify } = require("slugify");

const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { image } = req.files;

    const product = new productModel({ ...req.fields, slug: slugify(name) });
    if (image) {
      product.image.data = fs.readFileSync(image.path);
      product.contentType = image.type;
    }

    await product.save();
    res.status(201).send({
      success: true,
      message: "Product Created successfully",
      product,
    });
  } catch (error) {
    console.log(`ERROR IN CREATING PRODUCT ${error}`);
    res.status(500).send({
      success: false,
      message: "Server Problem, Please try again!",
    });
  }
};

//GETTING ALL PRODUCTS

const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .select("-image")
      .populate("category")
      .limit(15)
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      totalProduct: products.length,
      message: "List of Products",
      products,
    });
  } catch (error) {
    console.log(`ERROR IN GETIING PRODUCT ${error}`);
    res.status(500).send({
      success: false,
      message: "Server Problem, Please try again!",
    });
  }
};

//GET SINGLE PRODUCT
const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-image")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Search Product",
      product,
    });
  } catch (error) {
    console.log(`ERROR IN GETIING SINGLE PRODUCT ${error}`);
    res.status(500).send({
      success: false,
      message: "Server Problem, Please try again!",
    });
  }
};

//GET PRODUCT IMAGE
const productImageController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id).select("image");
    if (product.image.data) {
      res.set("Content-Type", product.image.contentType);
      return res.status(200).send(product.image.data);
    } else {
      return res.send("NOT FOUND");
    }
  } catch (error) {
    console.log(`ERROR IN GETIING PRODUCT IMAGE ${error}`);
    res.status(500).send({
      success: false,
      message: "Server Problem, Please try again!",
    });
  }
};

//DELETE PRODUCT
const deleteProductController = async (req, res) => {
  try {
    const product = await productModel
      .findByIdAndDelete(req.params.id)
      .select("-image");

    return res.status(200).send({
      success: true,
      message: "Product Deleted successfully!",
    });
  } catch (error) {
    console.log(`ERROR IN DELETING PRODUCT ${error}`);
    res.status(500).send({
      success: false,
      message: "Server Problem, Please try again!",
    });
  }
};

//UPDATE PRODUCT
const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { image } = req.files;

    const product = await productModel.findByIdAndUpdate(
      req.params.id,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (image) {
      product.image.data = fs.readFileSync(image.path);
      product.contentType = image.type;
    }

    await product.save();
    res.status(201).send({
      success: true,
      message: "Product Updated successfully",
      product,
    });
  } catch (error) {
    console.log(`ERROR IN UPDATING PRODUCT ${error}`);
    res.status(500).send({
      success: false,
      message: "Server Problem, Please try again!",
    });
  }
};

//Filter Product

const productFilterController = async (req, res) => {
  try {
    let args = {};
    const { checked, prices } = req.body;
    if (checked.length > 0) args.category = checked;
    if (prices.length) args.price = { $gte: prices[0], $lte: prices[1] };

    const filteredProducts = await productModel.find(args);
    res.status(200).send({
      filteredProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Server Problem",
    });
  }
};

//Product count

const productCountController = async (req, res) => {
  try {
    const totalProducts = await productModel.find({}).count();
    res.status(200).send({
      totalProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Server Problem",
    });
  }
};

const productListController = async (req, res) => {
  try {
    const perPage = 3;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-image")
      .skip((page - 1) * perPage)
      .limit(3)
      .sort({ createdAt: -1 });

    res.status(200).send({
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Server Problem",
    });
  }
};

const searchProductController = async (req, res) => {
  try {
    const { keywords } = req.params;
    const result = await productModel
      .find({
        $or: [{ name: keywords }, { description: keywords }],
      })
      .select("-image");

    res.status(200).send({ message: "success", result });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Server Problem",
    });
  }
};

module.exports = {
  createProductController,
  getProductController,
  getSingleProductController,
  productImageController,
  deleteProductController,
  updateProductController,
  productFilterController,
  productCountController,
  productListController,
  searchProductController,
};
