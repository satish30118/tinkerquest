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
} = require("../controllers/bookingController");

const router = express.Router();

//ROUTING
router.route("/new-booking").post(userVerification, createBooking);

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

module.exports = router;
