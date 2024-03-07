const categoryModel = require("../models/categoryModel");
const slugify = require("slugify");

//CREATING CATEGORY
const CreateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;

    //CHECKING EXISTING CATEGORY
    const categoryExist = await categoryModel.findOne({ name });
    if (categoryExist) {
      res.status(200).send({
        message: "Category Already Exists",
      });
      return;
    }

    //CREATING NEW CATEGORY
    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();
    if (category) {
      res.status(201).send({
        message: "Category Created Successfully",
        category,
      });
      return;
    }
  } catch (error) {
    console.log(`ERROR IN CREATE CATEGORY ${error}`);
    res.status(500).send({
      success: false,
      message: "Server Problem, Please try again!",
    });
  }
};

//UPDATING CATEGORY
const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );

    if (category) {
      res.status(200).send({
        message: "Category updated Successfully",
        category,
      });
    }
  } catch (error) {
    console.log(`ERROR IN CREATE CATEGORY ${error}`);
    res.status(500).send({
      success: false,
      message: "Server Problem, Please try again!",
    });
  }
};

//GET ALL CATEGORY

const categoryController = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    res.status(200).send({
      message: "ALL Category list",
      category,
    });
  } catch (error) {
    console.log(`ERROR IN GETTING ALL CATEGORY ${error}`);
    res.status(500).send({
      success: false,
      message: "Server Problem, Please try again!",
    });
  }
};

//GET SINGLE DESIRED CATEGORY
const singleCategoryController = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await categoryModel.findOne({ slug });
    if (!category) {
      res.status(200).send({
        message: "No such Category Exist",
      });
      res.status(200).send({
        message: "Got Single Category",
        category,
      });
    }
  } catch (error) {
    console.log(`ERROR IN GETTING SINGLE CATEGORY ${error}`);
    res.status(500).send({
      success: false,
      message: "Server Problem, Please try again!",
    });
  }
};

//DELETING CATEGORY
const deleteCategoryController = async (req, res) => {
  try {
    const {id} = req.params;
    await categoryModel.findByIdAndDelete(id)
    res.status(200).send({
        success:true,
        message: "Category deleted successfully",
      });

  } catch (error) {
    console.log(`ERROR IN DELETING CATEGORY ${error}`);
    res.status(500).send({
      success: false,
      message: "Server Problem, Please try again!",
    });
  }
};

module.exports = {
  CreateCategoryController,
  updateCategoryController,
  categoryController,
  singleCategoryController,
  deleteCategoryController,
};
