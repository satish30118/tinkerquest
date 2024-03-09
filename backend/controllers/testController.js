const TestName = require("../models/testNameModel");

//CREATING NEW TEST NAME;
const CreateTestController = async (req, res) => {
  try {
    const {testName, testCategory, testPrice } = req.body;

    //CHECKING EXISTING CATEGORY
    const TestExist = await TestName.findOne({ testName });
    if (TestExist) {
      res.status(200).send({
        message: "Test Already Exists",
      });
      return;
    }

    //CREATING NEW TEST
    const test = await new TestName({ testName, testCategory, testPrice }).save();
    if (test) {
      res.status(201).send({
        message: "Test Created Successfully",
        test,
      });
      return;
    }
  } catch (error) {
    console.log(`ERROR IN CREATE New test ${error}`);
    res.status(500).send({
      success: false,
      message: "Server Problem, Please try again!",
    });
  }
};

//UPDATING Test Name
const updateTestController = async (req, res) => {
  try {
    const { name, category } = req.body;
    const { id } = req.params;
    const updatedTest = await categoryModel.findByIdAndUpdate(
      id,
      { name, category },
      { new: true }
    );

    if (updatedTest) {
      res.status(200).send({
        message: " updated Successfully",
        updatedTest,
      });
    }
  } catch (error) {
    console.log(`ERROR IN update test ${error}`);
    res.status(500).send({
      success: false,
      message: "Server Problem, Please try again!",
    });
  }
};

//GET ALL test
const allTestController = async (req, res) => {
  try {
    const test = await TestName.find({});
    res.status(200).send({
      message: "ALL Test list",
      test,
    });
  } catch (error) {
    console.log(`ERROR IN GETTING ALL Tests ${error}`);
    res.status(500).send({
      success: false,
      message: "Server Problem, Please try again!",
    });
  }
};

//GET ALL test category wise

const allTestCategoryController = async (req, res) => {
  try {
    const {category} = req.params;
    const test = await TestName.find({testCategory:category});
    res.status(200).send({
      message: "ALL Category Test list",
      test,
    });
  } catch (error) {
    console.log(`ERROR IN GETTING ALL Tests ${error}`);
    res.status(500).send({
      success: false,
      message: "Server Problem, Please try again!",
    });
  }
};

//DELETING CATEGORY
const deleteTestController = async (req, res) => {
  try {
    const { id } = req.params;
    await TestName.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Test deleted successfully",
    });
  } catch (error) {
    console.log(`ERROR IN DELETING Test ${error}`);
    res.status(500).send({
      success: false,
      message: "Server Problem, Please try again!",
    });
  }
};

module.exports = {
  CreateTestController,
  updateTestController,
  allTestController,
  allTestCategoryController,
  deleteTestController,
};
