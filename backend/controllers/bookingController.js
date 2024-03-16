const Booking = require("../models/testBookingModel");
const TestName = require("../models/testNameModel");

const createBooking = async (req, res) => {
  try {
    const {
      name,
      gender,
      age,
      mobile,
      testCategory,
      testName,
      city,
      collectionDate,
    } = req.body;

    const data = await TestName.findOne({ testName });
    const newbooking = await Booking({
      name,
      gender,
      age,
      mobile,
      testCategory,
      testName,
      city,
      collectionDate,
      testPrice: data.testPrice,
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

/*Get all booking*/
const getAllBooking = async (req, res) => {
  try {
    const allBooking = await Booking.find({}).sort({ createdAt: -1 });
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
    const bookingPendding = await Booking.find({ status: "pending" }).sort({
      createdAt: -1,
    });
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
    const bookingCompleted = await Booking.find({ status: "completed" }).sort({
      createdAt: -1,
    });
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

/*Delete single Booking*/
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

/* LOACTION WISE */
/*Get all booking location wise*/
const getAllBookingLocationWise = async (req, res) => {
  try {
    const { city } = req.params;
    const allBooking = await Booking.find({ city }).sort({ createdAt: -1 });
    res.status(200).send({
      message: `All booking details in ${city}`,
      allBooking,
    });
  } catch (error) {
    console.log(`ERROR IN GETTING ALL booking in location wise ${error}`);
    res.status(500).send({
      success: false,
      message: "Server Problem, Please try again!",
    });
  }
};
/*Get Pendding Booking Location wise*/
const getPenddingBookingLocationWise = async (req, res) => {
  try {
    const { city } = req.params;
    const bookingPendding = await Booking.find({
      city,
      status: "pending",
    }).sort({ createdAt: -1 });
    res.status(200).send({
      message: `All Pendding booking details in ${city}`,
      bookingPendding,
    });
  } catch (error) {
    console.log(`ERROR IN GETTING ALL Pendding booking location wise ${error}`);
    res.status(500).send({
      success: false,
      message: "Server Problem, Please try again!",
    });
  }
};

/* All Completed Booking location wise */
const getCompletedBookingLocationWise = async (req, res) => {
  try {
    const { city } = req.params;
    const bookingCompleted = await Booking.find({
      city,
      status: "completed",
    }).sort({ createdAt: -1 });
    res.status(200).send({
      message: `All completed booking details in ${city}`,
      bookingCompleted,
    });
  } catch (error) {
    console.log(
      `ERROR IN GETTING ALL completed booking location wise ${error}`
    );
    res.status(500).send({
      success: false,
      message: "Server Problem, Please try again!",
    });
  }
};

/* CATEGORY WISE COUNTING */
const getCategoryWiseCount = async (req, res) => {
  try {
    const { cat, city } = req.params;
    const categoryCount = await Booking.find({
      testCategory: cat,
      city,
    }).count();
    res.status(200).send({
      message: `All booking details in ${cat}`,
      categoryCount,
    });
  } catch (error) {
    console.log(`ERROR IN GETTING categoryy wise counting ${error}`);
    res.status(500).send({
      success: false,
      message: "Server Problem, Please try again!",
    });
  }
};

/* Month Wise */
const getMonthsData = async (req, res) => {
  const { city, monthNo, status } = req.params;
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + parseFloat(monthNo);

  console.log(typeof(monthNo));
  try {
    if (status == "overall") {
      const MonthsCount = await Booking.find({
        $expr: {
          $and: [
            { $eq: [{ $year: "$createdAt" }, currentYear] },
            { $eq: [{ $month: "$createdAt" }, currentMonth] },
          ],
        },
        city
      }).count();

      res.status(200).send({
        message: `All booking details in monthwise`,
        MonthsCount,
      });
      return;
    } else {
      const MonthsCount = await Booking.find({
        $expr: {
          $and: [
            { $eq: [{ $year: "$createdAt" }, currentYear] },
            { $eq: [{ $month: "$createdAt" }, currentMonth] },
          ],
        },
        city, status
      }).count();

      res.status(200).send({
        message: `All booking details in monthwise`,
        MonthsCount,
      });
      return;
    }
  } catch (error) {
    console.log(`ERROR IN GETTING categoryy wise counting ${error}`);
    res.status(500).send({
      success: false,
      message: "Server Problem, Please try again!",
    });
  }
};

/* GET BOOKING BY SEARCH */
const getBookingBySearch = async (req, res) => {
  try {
    const { name } = req.params;
    const searchedPatient = await Booking.aggregate([
      {
        $search: {
          index: "default",
          text: {
            query: name,
            path: {
              wildcard: "*",
            },
            fuzzy: {},
          },
        },
      },
    ]);
    res.status(200).send({
      message: `All booking details of ${name}`,
      searchedPatient,
    });
  } catch (error) {
    console.log(`ERROR IN GETTING Single search ${error}`);
    res.status(500).send({
      success: false,
      message: "Server Problem, Please try again!",
    });
  }
};

/* SEARCH AUTO COMPLETE */
const getSearchAutoComplete = async (req, res) => {
  try {
    const { name } = req.params;
    const searchedPatient = await Booking.aggregate([
      {
        $search: {
          index: "autoCompleteSearch",
          autocomplete: {
            query: name,
            path: "name",
            tokenOrder: "sequential",
            // "fuzzy": ,
            // "score":
          },
        },
      },
      {
        $limit: 10,
      },
      {
        $project: {
          name: 1,
        },
      },
    ]);
    res.status(200).send({
      message: `All booking details of ${name}`,
      searchedPatient,
    });
  } catch (error) {
    console.log(`ERROR IN GETTING Single search ${error}`);
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
  getSingleBooking,
  deleteBooking,
  getPenddingBooking,
  getCompletedBooking,
  getAllBookingLocationWise,
  getCompletedBookingLocationWise,
  getPenddingBookingLocationWise,
  getCategoryWiseCount,
  getBookingBySearch,
  getSearchAutoComplete,
  getMonthsData,
};
