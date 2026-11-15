
const { getGroupByIdFromMemory } = require("../controllers/groupController");

const checkGroupMembership = (req, res, next) => {
    try {
        const groupId = req.params.groupId || req.body.groupId;

        if (!groupId) {
            return res.status(400).json({
                success: false,
                message: "Group ID is required"
            });
        }

        const group = getGroupByIdFromMemory(groupId);

        if (!group) {
            return res.status(404).json({
                success: false,
                message: "Group not found"
            });
        }

        if (!group.members.includes(req.user.id)) {
            return res.status(403).json({
                success: false,
                message: "You are not a member of this group"
            });
        }

        req.group = group;
        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Group authorization failed"
        });
    }
};

module.exports = { checkGroupMembership };
