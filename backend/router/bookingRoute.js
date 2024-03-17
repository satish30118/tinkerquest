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
  getMonthCityData,
  getMonthOverallData,
} = require("../controllers/bookingController");

const router = express.Router();


//ROUTING
router.route("/new-booking").post(userVerification, createBooking);


//COMPLETE ALL LOCATION*/
router.get(
  "/get-all-booking",
  userVerification,
  getAllBooking
);

router.get(
  "/get-pendding-booking",
  userVerification,
  getPenddingBooking
);

router.get(
  "/get-completed-booking",
  userVerification,
  getCompletedBooking
);

router.get(
  "/get-single-booking/:id",
  userVerification,
  getSingleBooking
);

router
  .route("/update-booking/:id")
  .put(userVerification, updateBooking);

  router
  .route("/delete-booking/:id")
  .delete(userVerification, deleteBooking);

  /* ROUTING LOCATION WISE */ 
router.get(
  "/get-all-booking/location-wise/:city",
  userVerification,
  getAllBookingLocationWise
);

router.get(
  "/get-pendding-booking/location-wise/:city",
  userVerification,
  getPenddingBookingLocationWise
);

router.get(
  "/get-completed-booking/location-wise/:city",
  userVerification,
  getCompletedBookingLocationWise
);

  /* CATEGORY WISE DEATAILS */ 
router.get(
  "/get-completed-booking/category-wise/:cat/:city",
  userVerification,
  getCategoryWiseCount,
);
  /* MONTH WISE DEATAILS With Location */ 
  router.get(
    "/month/:city/:monthNo",
    userVerification,
    getMonthCityData,
  );
  /* MONTH WISE DEATAILS OVERALL*/ 
  router.get(
    "/month-overall/:monthNo",
    userVerification,
    getMonthOverallData,
  );

/* SEACHING BOOKING */
router.get(
  "/search-by-name/:name",
  userVerification,
  getBookingBySearch,
);

/* SEACHING AUTOCOMPLETE */
router.get(
  "/search-autocomplete/:name",
  userVerification,
  getSearchAutoComplete
);
module.exports = router;
