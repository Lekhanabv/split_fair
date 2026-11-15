const mongoose = require("mongoose");

const verificationSchema = new mongoose.Schema(
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

        verifiedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        status: {
            type: String,
            enum: ["Pending", "Approved", "Rejected"],
            default: "Pending"
        },

        comments: {
            type: String,
            default: "",
            maxlength: 500
        },

        verifiedAt: {
            type: Date,
            default: null
        }
    },
    { timestamps: true }
);

// Prevent duplicate verification records for the same user and expense
verificationSchema.index(
    { expense: 1, verifiedBy: 1 },
    { unique: true }
);

module.exports = mongoose.model("Verification", verificationSchema);