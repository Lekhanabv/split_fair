const express = require("express");
const router = express.Router();

const {
    verifyExpense
} = require("../controllers/verificationController");

const { protect } = require("../middleware/authMiddleware");

// Approve or reject an expense
router.post("/verify", protect, verifyExpense);

module.exports = router;