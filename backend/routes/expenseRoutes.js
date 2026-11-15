
const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { checkGroupMembership } = require("../middleware/groupMiddleware");

const {
    addExpense,
    getGroupExpenses,
    getGroupBalances,
    getGroupSettlements,
    updateExpense,
    deleteExpense
} = require("../controllers/expenseController");

// Authentication required for all routes
router.use(protect);

// Add expense only if user belongs to the group
router.post("/", checkGroupMembership, addExpense);

// Group-specific access requires membership
router.get("/group/:groupId", checkGroupMembership, getGroupExpenses);

router.get("/group/:groupId/balances", checkGroupMembership, getGroupBalances);

router.get("/group/:groupId/settlements", checkGroupMembership, getGroupSettlements);

// Existing expense ownership checks remain in the controller
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);

module.exports = router;
