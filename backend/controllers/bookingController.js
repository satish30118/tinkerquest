const Booking = require("../models/testBookingModel");

const createBooking = async (req, res) => {
  try {
    const {
      name,
      gender,
      age,
      mobile,
      testCategory,
      testName,
      collectionDate,
    } = req.body;

    const newbooking = await Booking({
      name,
      gender,
      age,
      mobile,
      testCategory,
      testName,
      collectionDate,
    }).save();

    if (!newbooking) {
      res.status(400).send({
        success: false,
        message: "Booking unsuccessfull!",
      });
      return;
    }

    res.status(201).send({
      success: true,
      message: "Booking successfully registered",
      bookingDetails: newbooking,
    });
  } catch (error) {
    console.log(error);
    res.status(422).send({
      success: false,
      message: "Server problem please try again",
    });
  }
};

/* Booking Update*/
const updateBooking = async (req, res) => {
  try {
    const { name, gender, age, mobile, testName, testMtd, testDate, status } =
      req.body;
    const { id } = req.params;
    const updatedbooking = await Booking.findByIdAndUpdate(
      id,
      { name, gender, age, mobile, testName, testMtd, testDate, status },
      { new: true }
    );

    if (updatedbooking) {
      res.status(200).send({
        message: " updated Successfully",
        updatedbooking,
      });
    }
  } catch (error) {
    console.log(`ERROR IN update booking ${error}`);
    res.status(500).send({
      success: false,
      message: "Server Problem, Please try again!",
    });
  }
};

/*Get all <booking*/

const getAllBooking = async (req, res) => {
  try {
    const allBooking = await Booking.find({});
    res.status(200).send({
      message: "All booking details",
      allBooking,
    });
  } catch (error) {
    console.log(`ERROR IN GETTING ALL booking ${error}`);
    res.status(500).send({
      success: false,
      message: "Server Problem, Please try again!",
    });
  }
};

/*Get Pendding Booking*/

const getPenddingBooking = async (req, res) => {
  try {
    const bookingPendding = await Booking.find({ status: "pending" });
    res.status(200).send({
      message: "All Pendding booking details",
      bookingPendding,
    });
  } catch (error) {
    console.log(`ERROR IN GETTING ALL Pendding booking ${error}`);
    res.status(500).send({
      success: false,
      message: "Server Problem, Please try again!",
    });
  }
};

/* All Completed Booking*/

const getCompletedBooking = async (req, res) => {
  try {
    const bookingCompleted = await Booking.find({ status: "completed" });
    res.status(200).send({
      message: "All completed booking details",
      bookingCompleted,
    });
  } catch (error) {
    console.log(`ERROR IN GETTING ALL completed booking ${error}`);
    res.status(500).send({
      success: false,
      message: "Server Problem, Please try again!",
    });
  }
};

/*Single booking details*/

const getSingleBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const singleBooking = await Booking.findById(id);
    res.status(200).send({
      message: "sigle booking details",
      singleBooking,
    });
  } catch (error) {
    console.log(`ERROR IN GETTING single booking ${error}`);
    res.status(500).send({
      success: false,
      message: "Server Problem, Please try again!",
    });
  }
};

/*Delete Booking*/

const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const bookingDelete = await Booking.findByIdAndDelete(id);
    if (bookingDelete) {
      res.status(200).send({
        message: "deleted successfully",
      });
      return;
    }
    res.status(400).send({
      message: "can't deleted",
    });
  } catch (error) {
    console.log(`ERROR IN deleting booking ${error}`);
    res.status(500).send({
      success: false,
      message: "Server Problem, Please try again!",
    });
  }
};

module.exports = {
  createBooking,
  updateBooking,
  getAllBooking,
  getPenddingBooking,
  getCompletedBooking,
  getSingleBooking,
  deleteBooking,
};
