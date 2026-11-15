const Dispute = require("../models/Dispute");
const Expense = require("../models/Expense");
const Group = require("../models/Group");

// Raise a new dispute
exports.raiseDispute = async (req, res) => {
    try {
        const { expenseId, reason, description } = req.body;

        if (!expenseId || !reason) {
            return res.status(400).json({
                message: "Expense ID and reason are required"
            });
        }

        const expense = await Expense.findById(expenseId);

        if (!expense) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        const group = await Group.findById(expense.group);

        if (!group) {
            return res.status(404).json({
                message: "Group not found"
            });
        }

        const userId = req.user._id;

        const isMember = group.members.some(
            member => member.user.toString() === userId.toString()
        );

        if (!isMember) {
            return res.status(403).json({
                message: "You are not a member of this group"
            });
        }

        const dispute = await Dispute.create({
            expense: expenseId,
            group: expense.group,
            raisedBy: userId,
            reason,
            description
        });

        res.status(201).json({
            message: "Dispute raised successfully",
            dispute
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to raise dispute",
            error: error.message
        });
    }
};

// Get all disputes for a group
exports.getGroupDisputes = async (req, res) => {
    try {
        const { groupId } = req.params;
        const userId = req.user._id;

        const group = await Group.findById(groupId);

        if (!group) {
            return res.status(404).json({
                message: "Group not found"
            });
        }

        const isMember = group.members.some(
            member => member.user.toString() === userId.toString()
        );

        if (!isMember) {
            return res.status(403).json({
                message: "You are not a member of this group"
            });
        }

        const disputes = await Dispute.find({
            group: groupId
        })
        .populate("raisedBy", "name email")
        .populate("expense");

        res.status(200).json({
            count: disputes.length,
            disputes
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch disputes",
            error: error.message
        });
    }
};
// Resolve or reject a dispute (Group Admin only)
exports.resolveDispute = async (req, res) => {
    try {
        const { disputeId } = req.params;
        const { status, resolution } = req.body;

        if (!["Resolved", "Rejected"].includes(status)) {
            return res.status(400).json({
                message: "Status must be Resolved or Rejected"
            });
        }

        if (!resolution || !resolution.trim()) {
            return res.status(400).json({
                message: "Resolution details are required"
            });
        }

        const dispute = await Dispute.findById(disputeId);

        if (!dispute) {
            return res.status(404).json({
                message: "Dispute not found"
            });
        }

        const group = await Group.findById(dispute.group);

        if (!group) {
            return res.status(404).json({
                message: "Group not found"
            });
        }

        const admin = group.members.find(
            member =>
                member.user.toString() === req.user._id.toString() &&
                member.role === "Admin"
        );

        if (!admin) {
            return res.status(403).json({
                message: "Only group admins can resolve disputes"
            });
        }

        if (["Resolved", "Rejected"].includes(dispute.status)) {
            return res.status(400).json({
                message: "This dispute has already been closed"
            });
        }

        dispute.status = status;
        dispute.resolution = resolution;
        dispute.resolvedBy = req.user._id;
        dispute.resolvedAt = new Date();

        await dispute.save();

        res.status(200).json({
            message: `Dispute ${status.toLowerCase()} successfully`,
            dispute
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to resolve dispute",
            error: error.message
        });
    }
};
