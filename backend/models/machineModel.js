const mongoose = require("mongoose");

const machineSchema = new mongoose.Schema(
  {
    city: {
      type: String,
    },
    machineName: {
      type: String,
      trim: true,
    },
    machineStock: {
      type: Number,
      trim: true,
    },
    machineCost: {
      type: Number,
      trim: true,
    },
    testLimit: {
      type: Number,
      trim: true,
    },
    testCategory: {
      type: String,
      trim: true,
    },
    testName: {
      type: String,
      trim: true,
    },
    reagent: [
      {
        reagentName: String,
        reagentUnit: String,
        reqPerTest: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Machine = new mongoose.model("Machine", machineSchema);

module.exports = Machine;
