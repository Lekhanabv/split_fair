const mongoose = require("mongoose");

const receiptSchema = new mongoose.Schema(
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

        uploadedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        imageUrl: {
            type: String,
            required: true
        },

        publicId: {
            type: String,
            default: ""
        },

        fileHash: {
            type: String,
            default: null
        },

        uploadedAt: {
            type: Date,
            default: Date.now
        }
    },
    { timestamps: true }
);

// Index for faster duplicate receipt searches
receiptSchema.index({ fileHash: 1 });

module.exports = mongoose.model("Receipt", receiptSchema);
