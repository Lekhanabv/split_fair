const mongoose = require("mongoose");

const trustScoreSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },

        score: {
            type: Number,
            default: 50,
            min: 0,
            max: 100
        },

        totalExpenses: {
            type: Number,
            default: 0,
            min: 0
        },

        approvedExpenses: {
            type: Number,
            default: 0,
            min: 0
        },

        rejectedExpenses: {
            type: Number,
            default: 0,
            min: 0
        },

        disputesRaised: {
            type: Number,
            default: 0,
            min: 0
        },

        successfulPayments: {
            type: Number,
            default: 0,
            min: 0
        },

        lastUpdated: {
            type: Date,
            default: Date.now
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("TrustScore", trustScoreSchema);