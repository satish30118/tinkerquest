const Reagent = require("../models/ReagentModel");

//CREATING NEW  REAGENT;
const CreateReagentController = async (req, res) => {
  try {
    const { city, reagentName, reagentUnit, reagentAmount,reagentCost } = req.body;

    //CHECKING EXISTING REAGENT
    const reagentExist = await Reagent.findOne({ reagentName, city });
    if (reagentExist) {
      res.status(200).send({
        message: "Reagent Already Exists",
         reagentExist,
      });
      return;
    }

    //CREATING NEW REAGENT
    const reagent = await new Reagent({
      city,
      reagentName,
      reagentUnit,
      reagentAmount,
      reagentCost,
    }).save();
    if (reagent) {
      res.status(201).send({
        message: "Reagent Created Successfully",
        reagent,
      });
      return;
    }
  } catch (error) {
    console.log(`ERROR IN CREATE NEW REAGENT ${error}`);
    res.status(500).send({
      success: false,
      message: "Server Problem, Please try again!",
    });
  }
};

//UPDATING REAGENT AMOUNT
const updateReagentController = async (req, res) => {
  try {
    const { reagentAmount, reagentCost } = req.body;
    const { id } = req.params;
    const updatedReagent = await Reagent.findByIdAndUpdate(
      id,
      { reagentAmount, reagentCost },
      { new: true }
    );

    if (updatedReagent) {
      res.status(200).send({
        message: " updated Successfully",
        updatedReagent,
      });
    }
  } catch (error) {
    console.log(`ERROR IN UPDATING REAGENT AMOUNT ${error}`);
    res.status(500).send({
      success: false,
      message: "Server Problem, Please try again!",
    });
  }
};

//GET ALL REAGENTS
const allReagentController = async (req, res) => {
  try {
    const reagents = await Reagent.find({});
    res.status(200).send({
      message: "ALL REAGENT LIST",
      reagents,
    });
  } catch (error) {
    console.log(`ERROR IN GETTING ALLREAGENTS ${error}`);
    res.status(500).send({
      success: false,
      message: "Server Problem, Please try again!",
    });
  }
};

//GET ALL REAGENTS CITY WISE
const allReagentCityController = async (req, res) => {
  try {
    const {city }= req.params;
    const reagents = await Reagent.find({city});
    res.status(200).send({
      message: "ALL REAGENT LIST CITY WISE",
      reagents,
    });
  } catch (error) {
    console.log(`ERROR IN GETTING ALLREAGENTS CITY WISE ${error}`);
    res.status(500).send({
      success: false,
      message: "Server Problem, Please try again!",
    });
  }
};

//DELETING REAGENTS
const deleteReagentController = async (req, res) => {
  try {
    const { id } = req.params;
    await Reagent.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Reagent deleted successfully",
    });
  } catch (error) {
    console.log(`ERROR IN DELETING REAGENT ${error}`);
    res.status(500).send({
      success: false,
      message: "Server Problem, Please try again!",
    });
  }
};

// SINGLE REAGENTS
const singleReagentController = async (req, res) => {
  try {
    const { id } = req.params;
    const reagent = await Reagent.findById({_id : id });
    res.status(200).send({
      success: true,
      message: "Reagent get successfully",
      reagent,
    });
  } catch (error) {
    console.log(`ERROR IN GET SINGLE REAGENT ${error}`);
    res.status(500).send({
      success: false,
      message: "Server Problem, Please try again!",
    });
  }
};

module.exports = {
  CreateReagentController,
  updateReagentController,
  allReagentController,
  allReagentCityController,
  deleteReagentController,
  singleReagentController,
};
