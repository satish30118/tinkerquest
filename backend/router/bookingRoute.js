const express = require("express");
const {
  userVerification,
  adminVerification,
} = require("../middleware/authMiddleware");
const {
  createBooking,
  getAllBooking,
  getSingleBooking,
  updateBooking,
  getCompletedBooking,
  getPenddingBooking,
  deleteBooking,
  getAllBookingLocationWise,
  getPenddingBookingLocationWise,
  getCompletedBookingLocationWise,
} = require("../controllers/bookingController");

const router = express.Router();


//ROUTING
router.route("/new-booking").post(userVerification, createBooking);


//COMPLETE ALL LOCATION*/
router.get(
  "/get-all-booking",
  userVerification,
  adminVerification,
  getAllBooking
);

router.get(
  "/get-pendding-booking",
  userVerification,
  adminVerification,
  getPenddingBooking
);

router.get(
  "/get-completed-booking",
  userVerification,
  adminVerification,
  getCompletedBooking
);

/* ROUTING LOCATION WISE */ 
router.get(
  "/get-all-booking/location-wise/:city",
  userVerification,
  adminVerification,
  getAllBookingLocationWise
);

router.get(
  "/get-pendding-booking/location-wise/:city",
  userVerification,
  adminVerification,
  getPenddingBookingLocationWise
);

router.get(
  "/get-completed-booking/location-wise/:city",
  userVerification,
  adminVerification,
  getCompletedBookingLocationWise
);


router.get(
  "/get-single-booking/:id",
  userVerification,
  adminVerification,
  getSingleBooking
);

router
  .route("/update-booking/:id")
  .put(userVerification, adminVerification, updateBooking);

  router
  .route("/delete-booking/:id")
  .delete(userVerification, adminVerification, deleteBooking);

module.exports = router;
