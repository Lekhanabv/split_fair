const Verification = require("../models/Verification");
const Expense = require("../models/Expense");
const Group = require("../models/Group");

// Approve or Reject an Expense
exports.verifyExpense = async (req, res) => {
    try {
        const { expenseId, status, comments } = req.body;

        // Validate input
        if (!expenseId || !["Approved", "Rejected"].includes(status)) {
            return res.status(400).json({
                message: "Valid expense ID and status are required"
            });
        }

        // Find expense
        const expense = await Expense.findById(expenseId);

        if (!expense) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        // Get logged-in user ID from authentication middleware
        const userId = req.user._id;

        // Check group
        const group = await Group.findById(expense.group);

        if (!group) {
            return res.status(404).json({
                message: "Group not found"
            });
        }

        // Check whether user belongs to the group
        const isMember = group.members.some(
            member => member.user.toString() === userId.toString()
        );

        if (!isMember) {
            return res.status(403).json({
                message: "You are not a member of this group"
            });
        }

        // Save or update verification
        const verification = await Verification.findOneAndUpdate(
            {
                expense: expenseId,
                verifiedBy: userId
            },
            {
                expense: expenseId,
                group: expense.group,
                verifiedBy: userId,
                status,
                comments,
                verifiedAt: new Date()
            },
            {
                new: true,
                upsert: true,
                runValidators: true
            }
        );

        // If any member rejects, mark expense as rejected
        if (status === "Rejected") {
            expense.status = "Rejected";
            await expense.save();
        } else {
            // Check whether all group members approved
            const approvals = await Verification.countDocuments({
                expense: expenseId,
                status: "Approved"
            });

            const rejections = await Verification.countDocuments({
                expense: expenseId,
                status: "Rejected"
            });

            if (rejections === 0 && approvals >= group.members.length) {
                expense.status = "Approved";
                await expense.save();
            }
        }

        res.status(200).json({
            message: `Expense ${status} successfully`,
            verification
        });

    } catch (error) {
        res.status(500).json({
            message: "Verification failed",
            error: error.message
        });
    }
};