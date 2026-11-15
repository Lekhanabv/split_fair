const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
    {
        settlement: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Settlement",
            required: true
        },

        payer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        amount: {
            type: Number,
            required: true,
            min: 0.01
        },

        paymentMethod: {
            type: String,
            enum: ["UPI", "Cash", "Bank Transfer", "Other"],
            default: "Other"
        },

        transactionId: {
            type: String,
            default: ""
        },

        payerConfirmed: {
            type: Boolean,
            default: false
        },

        receiverConfirmed: {
            type: Boolean,
            default: false
        },

        status: {
            type: String,
            enum: ["Pending", "Completed", "Disputed"],
            default: "Pending"
        },

        paidAt: {
            type: Date,
            default: null
        }
    },
    { timestamps: true }
);

// Prevent self-payment
paymentSchema.pre("validate", function () {
    if (this.payer && this.receiver && this.payer.equals(this.receiver)) {
        this.invalidate("receiver", "Payer and receiver cannot be the same user");
    }
});

// Index for faster settlement searches
paymentSchema.index({ settlement: 1, status: 1 });

module.exports = mongoose.model("Payment", paymentSchema);