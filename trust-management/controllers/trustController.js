const TrustScore = require("../models/TrustScore");
const Expense = require("../models/Expense");
const Payment = require("../models/Payment");

// Get or create a user's trust score
exports.getTrustScore = async (req, res) => {
    try {
        const userId = req.user._id;

        let trust = await TrustScore.findOne({ user: userId });

        if (!trust) {
            trust = await TrustScore.create({
                user: userId,
                score: 50
            });
        }

        res.status(200).json({
            message: "Trust score fetched successfully",
            trust
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch trust score",
            error: error.message
        });
    }
};

// Recalculate user's trust score
exports.updateTrustScore = async (req, res) => {
    try {
        const userId = req.user._id;

        const totalExpenses = await Expense.countDocuments({
            paidBy: userId
        });

        const approvedExpenses = await Expense.countDocuments({
            paidBy: userId,
            status: "Approved"
        });

        const rejectedExpenses = await Expense.countDocuments({
            paidBy: userId,
            status: "Rejected"
        });

        const successfulPayments = await Payment.countDocuments({
            payer: userId,
            status: "Completed"
        });

        // Simple example scoring formula
        let score =
            50 +
            (approvedExpenses * 2) +
            (successfulPayments * 2) -
            (rejectedExpenses * 3);

        // Keep score between 0 and 100
        score = Math.max(0, Math.min(100, score));

        const trust = await TrustScore.findOneAndUpdate(
            { user: userId },
            {
                score,
                totalExpenses,
                approvedExpenses,
                rejectedExpenses,
                successfulPayments,
                lastUpdated: new Date()
            },
            {
                new: true,
                upsert: true,
                runValidators: true
            }
        );

        res.status(200).json({
            message: "Trust score updated successfully",
            trust
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to update trust score",
            error: error.message
        });
    }
};