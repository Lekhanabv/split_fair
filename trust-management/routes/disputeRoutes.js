const express = require("express");
const router = express.Router();

const {
    raiseDispute,
    getGroupDisputes,
    resolveDispute
} = require("../controllers/disputeController");

const { protect } = require("../middleware/authMiddleware");

// Raise a dispute
router.post("/raise", protect, raiseDispute);

// Get all disputes for a group
router.get("/group/:groupId", protect, getGroupDisputes);

// Resolve or reject a dispute
router.put("/:disputeId/resolve", protect, resolveDispute);

module.exports = router;