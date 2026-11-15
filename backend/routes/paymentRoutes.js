
const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { checkGroupMembership } = require("../middleware/groupMiddleware");

const {
    createPayment,
    getGroupPayments,
    updatePaymentStatus
} = require("../controllers/paymentController");

// Authentication required
router.use(protect);

// Create payment only for a group member
router.post("/", checkGroupMembership, createPayment);

// View payments only for a group member
router.get("/group/:groupId", checkGroupMembership, getGroupPayments);

// Update payment status
router.patch("/:id/status", checkGroupMembership, updatePaymentStatus);

module.exports = router;
