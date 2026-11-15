const express = require("express");
const router = express.Router();

const {
    getTrustScore,
    updateTrustScore
} = require("../controllers/trustController");

const { protect } = require("../middleware/authMiddleware");

// Get user's trust score
router.get("/", protect, getTrustScore);

// Update user's trust score
router.put("/update", protect, updateTrustScore);

module.exports = router;
