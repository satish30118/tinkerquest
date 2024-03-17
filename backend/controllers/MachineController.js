const Machine = require("../models/machineModel");



//CREATING NEW  MACHINE;
const CreateMachineController = async (req, res) => {
  try {
    const {city, machineName, machineStock,machineCost, testLimit, testCategory, testName, reagent } = req.body;

    //CHECKING EXISTING MACHINE
    const machineExist = await Machine.findOne({ machineName, city });
    if (machineExist) {
      res.status(200).send({
        message:"Machine Already Exists",
      });
      return;
    }

    //CREATING NEW MACHINE
    const machine = await new Machine({city, machineName, machineStock,machineCost, testLimit, testCategory, testName, reagent }).save();
    if (machine) {
      res.status(201).send({
        message: "Machine Created Successfully",
        machine,
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

//UPDATING MACHINE DETAILS
const updateMachineController = async (req, res) => {
  try {
    const {city, machineName, machineStock,machineCost, testLimit, testCategory, testName, reagent} = req.body;
    const { id } = req.params;
    const updatedMachine= await Machine.findByIdAndUpdate(
      id,
      { city, machineName, machineStock,machineCost, testLimit, testCategory, testName, reagent},
      { new: true }
    );

    if (updatedMachine) {
      res.status(200).send({
        message: " updated Successfully",
        updatedMachine,
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
const allMachineController = async (req, res) => {
  try {
    const machines = await Machine.find({}).sort({city:1});
    res.status(200).send({
      message: "ALL MACHINE LIST",
       machines,
    });
  } catch (error) {
    console.log(`ERROR IN GETTING ALL MACHINE ${error}`);
    res.status(500).send({
      success: false,
      message: "Server Problem, Please try again!",
    });
  }
};



//DELETING MACHINES
const deleteMachineController = async (req, res) => {
  try {
    const { id } = req.params;
    await Machine.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Machine deleted successfully",
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
  CreateMachineController,
  updateMachineController,
  allMachineController,
  deleteMachineController,
};
