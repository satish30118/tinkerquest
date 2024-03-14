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
  getCategoryWiseCount,
  getBookingBySearch,
  getSearchAutoComplete,
  getMonthsData,
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

  /* CATEGORY WISE DEATAILS */ 
router.get(
  "/get-completed-booking/category-wise/:cat/:city",
  userVerification,
  adminVerification,
  getCategoryWiseCount,
);
  /* MONTH WISE DEATAILS */ 
  router.get(
    "/get-all-booking/month",
    userVerification,
    adminVerification,
    getMonthsData,
  );

/* SEACHING BOOKING */
router.get(
  "/search-by-name/:name",
  userVerification,
  adminVerification,
  getBookingBySearch,
);

/* SEACHING AUTOCOMPLETE */
router.get(
  "/search-autocomplete/:name",
  userVerification,
  adminVerification,
  getSearchAutoComplete
);
module.exports = router;
