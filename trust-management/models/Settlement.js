const mongoose = require("mongoose");

const settlementSchema = new mongoose.Schema(
    {
        group: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Group",
            required: true
        },

        from: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        to: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        amount: {
            type: Number,
            required: true,
            min: 0.01
        },

        status: {
            type: String,
            enum: ["Pending", "Partially Paid", "Completed"],
            default: "Pending"
        },

        settledAt: {
            type: Date,
            default: null
        }
    },
    { timestamps: true }
);

// Prevent a user from paying themselves
settlementSchema.pre("validate", function () {
    if (this.from && this.to && this.from.equals(this.to)) {
        this.invalidate("to", "Payer and receiver cannot be the same user");
    }
});

// Index for faster group settlement searches
settlementSchema.index({ group: 1, status: 1 });

module.exports = mongoose.model("Settlement", settlementSchema);