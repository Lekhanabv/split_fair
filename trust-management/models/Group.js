const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 50
        },

        description: {
            type: String,
            default: "",
            maxlength: 300
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        members: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                    required: true
                },

                role: {
                    type: String,
                    enum: ["Admin", "Member"],
                    default: "Member"
                },

                joinedAt: {
                    type: Date,
                    default: Date.now
                }
            }
        ],

        status: {
            type: String,
            enum: ["Active", "Archived"],
            default: "Active"
        }
    },
    { timestamps: true }
);

// Prevent duplicate members in the same group
groupSchema.pre("validate", function () {
    const memberIds = this.members.map(member =>
        member.user.toString()
    );

    if (new Set(memberIds).size !== memberIds.length) {
        this.invalidate("members", "Duplicate group members are not allowed");
    }
});

module.exports = mongoose.model("Group", groupSchema);