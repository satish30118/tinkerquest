const mongoose = require("mongoose");

const BookingModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
      trim: true,
    },
    mobile: {
      type: Number,
      required: true,
    },
    testCategory: {
      type: String,
      required: true,
    },
    testName: {
      type: String,
      required: true,
    },
    city: {
      type: String,
    },
    collectionDate: {
      type: String,
    },

    status: {
      type: String,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Booking = new mongoose.model("Booking", BookingModel);

module.exports = Booking;
