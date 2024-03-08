const express = require("express");
const {
  userVerification,
  adminVerification,
} = require("../middleware/authMiddleware");
const { createBooking, getAllBooking, getSingleBooking, updateBooking } = require("../controllers/bookingController");

const router = express.Router();

//ROUTING
router.route("/new-booking").post(userVerification,createBooking);

router.get("/get-booking", userVerification,
adminVerification, getAllBooking);

router.get(
  "/get-single-booking/:id",
  userVerification,
  adminVerification,
  getSingleBooking
);

router
  .route("/update-booking/:id")
  .put(
    userVerification,
    adminVerification,
    updateBooking,
  );

module.exports = router;
