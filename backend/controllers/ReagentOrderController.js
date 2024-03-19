
const reagentOrder = require("../models/reagentOrderModel");

//CREATING NEW  OREDERED MACHINE;
const createReagentOrderController = async (req, res) => {
  try {
    const {
      city,
      reagentName,
      reagentUnit,
      reagentAmount,
      reagentCost,
    } = req.body;

    //CREATING NEW MACHINE
    const order = await new reagentOrder({
      city,
      reagentName,
      reagentUnit,
      reagentAmount,
      reagentCost,
    }).save();
    if (order) {
      res.status(201).send({
        message: "Reagent  Ordered Successfully",
        order,
      });
      return;
    }
  } catch (error) {
    console.log(`  ${error}`);
    res.status(500).send({
      success: false,
      message: "Server Problem, Please try again!",
    });
  }
};

//UPDATING REAGENT  ORDER DETAILS
const updateReagentOrderController = async (req, res) => {
  try {
    const {
      city,
      reagentName,
      reagentUnit,
      reagentAmount,
      reagentCost,
      orderStatus,
    } = req.body;
    const { id } = req.params;
    const updatedOrder = await reagentOrder.findByIdAndUpdate(
      id,
      {
        city,
        reagentName,
        reagentUnit,
        reagentAmount,
        reagentCost,
        orderStatus,
      },
      { new: true }
    );

    if (updatedOrder) {
      res.status(200).send({
        message: "Order updated Successfully",
        updatedOrder,
      });
    }
  } catch (error) {
    console.log(`ERROR IN UPDATING REAGENT DETAILS ${error}`);
    res.status(500).send({
      success: false,
      message: "Server Problem, Please try again!",
    });
  }
};

//GET ALL REAGENT
const allReagentOrderController = async (req, res) => {
  try {
    const orders = await reagentOrder.find({});
    res.status(200).send({
      message: "ALL Reagent ORDERED LIST",
      orders,
    });
  } catch (error) {
    console.log(`ERROR IN GETTING ALL MACHINE ${error}`);
    res.status(500).send({
      success: false,
      message: "Server Problem, Please try again!",
    });
  }
};

//GET ALL REAGENT CITY WISE
const allReagentOrderCityWiseController = async (req, res) => {
  try {
    const {city} = req.params;
    const orders = await reagentOrder.find({city});
    res.status(200).send({
      message: "ALL Reagent ORDERED LIST CITY WISE",
      orders,
    });
  } catch (error) {
    console.log(`ERROR IN GETTING ALL MACHINE CITY WISE${error}`);
    res.status(500).send({
      success: false,
      message: "Server Problem, Please try again!",
    });
  }
};

//GET SINGLE REAGENT
const singleReagentOrderController = async (req, res) => {
  try {
    const {id} = req.params;
    const singleOrder = await reagentOrder.findOne({_id:id});
    res.status(200).send({
      message: "Single Reagent ORDERED LIST",
      singleOrder,
    });
  } catch (error) {
    console.log(`ERROR IN GETTING SINGLE REGENT ${error}`);
    res.status(500).send({
      success: false,
      message: "Server Problem, Please try again!",
    });
  }
};

//DELETING REAGENT ORDER
const deleteReagentOrderController = async (req, res) => {
  try {
    const { id } = req.params;
    await reagentOrder.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Reagent Ordered deleted successfully",
    });
  } catch (error) {
    console.log(`ERROR IN DELETING MACHINE ${error}`);
    res.status(500).send({
      success: false,
      message: "Server Problem, Please try again!",
    });
  }
};

module.exports = {
  createReagentOrderController,
  updateReagentOrderController,
  allReagentOrderController,
  allReagentOrderCityWiseController,
  singleReagentOrderController,
  deleteReagentOrderController,
};
