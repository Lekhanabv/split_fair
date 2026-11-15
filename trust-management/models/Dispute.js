const mongoose = require("mongoose");

const disputeSchema = new mongoose.Schema(
    {
        expense: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Expense",
            required: true
        },

        group: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Group",
            required: true
        },

        raisedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        reason: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 100
        },

        description: {
            type: String,
            default: "",
            maxlength: 500
        },

        status: {
            type: String,
            enum: ["Open", "Under Review", "Resolved", "Rejected"],
            default: "Open"
        },

        resolution: {
            type: String,
            default: "",
            maxlength: 500
        },

        resolvedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null
        },

        resolvedAt: {
            type: Date,
            default: null
        }
    },
    { timestamps: true }
);

// Index for faster group dispute searches
disputeSchema.index({ group: 1, status: 1 });

module.exports = mongoose.model("Dispute", disputeSchema);