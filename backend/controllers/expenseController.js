
const { randomUUID } = require("crypto");
const { calculateShares } = require("../services/splitService");
const { calculateSettlements } = require("../services/settlementService");
// Temporary storage for testing
let expenses = [];

// ADD EXPENSE
const addExpense = (req, res) => {
    try {
        const {
            groupId,
            description,
            amount,
            splitType,
            participants
        } = req.body;

        // Validate required fields
        if (!groupId || !description || amount === undefined || !splitType) {
            return res.status(400).json({
                success: false,
                message: "Please provide groupId, description, amount and splitType"
            });
        }

        if (typeof description !== "string" || !description.trim()) {
            return res.status(400).json({
                success: false,
                message: "Description cannot be empty"
            });
        }

        if (!Number.isFinite(Number(amount)) || Number(amount) <= 0) {
            return res.status(400).json({
                success: false,
                message: "Amount must be a valid positive number"
            });
        }

        const allowedSplitTypes = ["equal", "percentage", "custom"];

        if (!allowedSplitTypes.includes(splitType)) {
            return res.status(400).json({
                success: false,
                message: "Invalid split type"
            });
        }

        if (!Array.isArray(participants) || participants.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Please provide at least one participant"
            });
        }

        // Calculate each participant's share
let shares;

try {
    shares = calculateShares(
        Number(amount),
        splitType,
        participants
    );
} catch (error) {
    return res.status(400).json({
        success: false,
        message: error.message
    });
}

const newExpense = {
    id: randomUUID(),
    groupId,
    description: description.trim(),
    amount: Number(amount),
    paidBy: req.user.id,
    splitType,
    participants,
    shares,
    createdAt: new Date()
};

        expenses.push(newExpense);

        return res.status(201).json({
            success: true,
            message: "Expense added successfully",
            expense: newExpense
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// GET EXPENSES BY GROUP
const getGroupExpenses = (req, res) => {
    try {
        const { groupId } = req.params;

        const groupExpenses = expenses.filter(
            expense => expense.groupId === groupId
        );

        return res.status(200).json({
            success: true,
            count: groupExpenses.length,
            expenses: groupExpenses
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getGroupBalances = (req, res) => {
    try {
        const { groupId } = req.params;

        // Get all expenses belonging to this group
        const groupExpenses = expenses.filter(
            expense => expense.groupId === groupId
        );

        if (groupExpenses.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No expenses found for this group",
                balances: []
            });
        }

        const balanceMap = {};

        groupExpenses.forEach(expense => {
            const payerId = expense.paidBy;

            // Initialize payer if not already present
            if (!balanceMap[payerId]) {
                balanceMap[payerId] = {
                    userId: payerId,
                    totalPaid: 0,
                    totalOwed: 0
                };
            }

            // Add the full expense amount to payer's paid amount
            balanceMap[payerId].totalPaid +=
                Math.round(expense.amount * 100);

            // Calculate each participant's share
            expense.shares.forEach(share => {
                const userId = share.userId;

                if (!balanceMap[userId]) {
                    balanceMap[userId] = {
                        userId,
                        totalPaid: 0,
                        totalOwed: 0
                    };
                }

                balanceMap[userId].totalOwed +=
                    Math.round(share.shareAmount * 100);
            });
        });

        // Calculate final balances
        const balances = Object.values(balanceMap).map(user => {
            const netBalance =
                user.totalPaid - user.totalOwed;

            return {
                userId: user.userId,
                totalPaid: user.totalPaid / 100,
                totalOwed: user.totalOwed / 100,
                netBalance: netBalance / 100,
                status:
                    netBalance > 0
                        ? "gets back"
                        : netBalance < 0
                            ? "owes"
                            : "settled"
            };
        });

        return res.status(200).json({
            success: true,
            message: "Group balances calculated successfully",
            balances
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getGroupSettlements = (req, res) => {
    try {
        const { groupId } = req.params;

        const groupExpenses = expenses.filter(
            expense => expense.groupId === groupId
        );

        if (groupExpenses.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No expenses found for settlement",
                settlements: []
            });
        }

        const balanceMap = {};

        groupExpenses.forEach(expense => {
            const payerId = expense.paidBy;

            if (!balanceMap[payerId]) {
                balanceMap[payerId] = {
                    userId: payerId,
                    totalPaid: 0,
                    totalOwed: 0
                };
            }

            balanceMap[payerId].totalPaid +=
                Math.round(expense.amount * 100);

            expense.shares.forEach(share => {
                const userId = share.userId;

                if (!balanceMap[userId]) {
                    balanceMap[userId] = {
                        userId,
                        totalPaid: 0,
                        totalOwed: 0
                    };
                }

                balanceMap[userId].totalOwed +=
                    Math.round(share.shareAmount * 100);
            });
        });

        const balances = Object.values(balanceMap).map(user => ({
            userId: user.userId,
            netBalance:
                (user.totalPaid - user.totalOwed) / 100
        }));

        const settlements = calculateSettlements(balances);

        return res.status(200).json({
            success: true,
            message: "Smart settlements calculated successfully",
            settlements
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};




// UPDATE EXPENSE
const updateExpense = (req, res) => {
    try {
        const { id } = req.params;
        const { description, amount, splitType } = req.body;

        const expense = expenses.find(
            item => item.id === id
        );

        if (!expense) {
            return res.status(404).json({
                success: false,
                message: "Expense not found"
            });
        }

        // Only the person who paid can update
        if (expense.paidBy !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to update this expense"
            });
        }

        // Validate and update amount
        if (amount !== undefined) {
            if (
                !Number.isFinite(Number(amount)) ||
                Number(amount) <= 0
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Amount must be a valid positive number"
                });
            }

            expense.amount = Number(amount);
        }

        // Validate and update description
        if (description !== undefined) {
            if (
                typeof description !== "string" ||
                !description.trim()
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Description cannot be empty"
                });
            }

            expense.description = description.trim();
        }

        // Validate and update split type
        if (splitType !== undefined) {
            if (!["equal", "percentage", "custom"].includes(splitType)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid split type"
                });
            }

            expense.splitType = splitType;
        }

        return res.status(200).json({
            success: true,
            message: "Expense updated successfully",
            expense
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// DELETE EXPENSE
const deleteExpense = (req, res) => {
    try {
        const { id } = req.params;

        const expenseIndex = expenses.findIndex(
            item => item.id === id
        );

        if (expenseIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Expense not found"
            });
        }

        const expense = expenses[expenseIndex];

        // Only the person who paid can delete
        if (expense.paidBy !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to delete this expense"
            });
        }

        expenses.splice(expenseIndex, 1);

        return res.status(200).json({
            success: true,
            message: "Expense deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



// EXPORT FUNCTIONS
module.exports = {
    addExpense,
    getGroupExpenses,
    getGroupBalances,
    getGroupSettlements,
    updateExpense,
    deleteExpense
};