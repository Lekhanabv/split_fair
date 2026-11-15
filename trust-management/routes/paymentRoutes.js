const express = require("express");
const router = express.Router();

const {
    confirmPayment
} = require("../controllers/paymentController");

const { protect } = require("../middleware/authMiddleware");

// Confirm a payment
router.put("/:paymentId/confirm", protect, confirmPayment);

module.exports = router;