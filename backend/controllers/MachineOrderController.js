const machineOrder = require("../models/machineorderModel");

//CREATING NEW  OREDERED MACHINE;
const createMachineOrderController = async (req, res) => {
  try {
    const {
      city,
      machineName,
      machineUnitOrder,
      machineCost,
      testLimit,
      testCategory,
      testName,
      reagent,
    } = req.body;

    //CREATING NEW MACHINE
    const order = await new machineOrder({
      city,
      machineName,
      machineUnitOrder,
      machineCost,
      testLimit,
      testCategory,
      testName,
      reagent,
    }).save();
    if (order) {
      res.status(201).send({
        message: "Machine  Ordered Successfully",
        order,
      });
      return;
    }
  } catch (error) {
    console.log(`ERROR IN CREATE NEW MACHINE ${error}`);
    res.status(500).send({
      success: false,
      message: "Server Problem, Please try again!",
    });
  }
};

//UPDATING MACHINE  ORDER DETAILS
const updateMachineOrderController = async (req, res) => {
  try {
    const {
      orderStatus,
    } = req.body;
    const { id } = req.params;
    const updatedOrder = await machineOrder.findByIdAndUpdate(
      id,
      {
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
    console.log(`ERROR IN UPDATING MACHINE DETAILS ${error}`);
    res.status(500).send({
      success: false,
      message: "Server Problem, Please try again!",
    });
  }
};

//GET ALL MACHINES
const allMachineOrderController = async (req, res) => {
  try {
    const orders = await machineOrder.find({});
    res.status(200).send({
      message: "ALL MACHINE ORDERED LIST",
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

//DELETING MACHINES ORDER
const deleteMachineOrderController = async (req, res) => {
  try {
    const { id } = req.params;
    await machineOrder.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Machine Ordered deleted successfully",
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
  createMachineOrderController,
  updateMachineOrderController,
  allMachineOrderController,
  deleteMachineOrderController,
};
