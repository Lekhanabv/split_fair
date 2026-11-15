const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
    {
        group: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Group",
            required: true
        },

        paidBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        title: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 100
        },

        description: {
            type: String,
            default: "",
            maxlength: 500
        },

        amount: {
            type: Number,
            required: true,
            min: 0.01
        },

        category: {
            type: String,
            default: "Other",
            trim: true
        },

        splitType: {
            type: String,
            enum: ["Equal", "Percentage", "Custom"],
            default: "Equal"
        },

        splits: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                    required: true
                },

                amount: {
                    type: Number,
                    required: true,
                    min: 0
                }
            }
        ],

        status: {
            type: String,
            enum: ["Pending", "Approved", "Rejected"],
            default: "Pending"
        },

        expenseDate: {
            type: Date,
            default: Date.now
        },

        modificationHistory: [
            {
                modifiedBy: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User"
                },

                modifiedAt: {
                    type: Date,
                    default: Date.now
                },

                changes: {
                    type: String,
                    maxlength: 500
                }
            }
        ]
    },
    { timestamps: true }
);

module.exports = mongoose.model("Expense", expenseSchema);