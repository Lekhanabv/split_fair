
const { randomUUID } = require("crypto");

// Temporary storage until database integration
let groups = [];
// Find a group using its ID
const getGroupByIdFromMemory = (groupId) => {
    return groups.find(group => group.id === groupId);
};

// CREATE GROUP
const createGroup = async (req, res) => {
    try {
        const { groupName, description } = req.body;

        if (!groupName || !groupName.trim()) {
            return res.status(400).json({
                success: false,
                message: "Group name is required"
            });
        }

        const newGroup = {
            id: randomUUID(),
            groupName: groupName.trim(),
            description: description || "",
            createdBy: req.user.id,
            members: [req.user.id],
            createdAt: new Date()
        };

        groups.push(newGroup);

        return res.status(201).json({
            success: true,
            message: "Group created successfully",
            group: newGroup
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// GET ALL GROUPS OF LOGGED-IN USER
const getMyGroups = async (req, res) => {
    try {
        const userGroups = groups.filter(group =>
            group.members.includes(req.user.id)
        );

        return res.status(200).json({
            success: true,
            count: userGroups.length,
            groups: userGroups
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// GET GROUP DETAILS
const getGroupById = async (req, res) => {
    try {
        const group = groups.find(
            group => group.id === req.params.id
        );

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

        return res.status(200).json({
            success: true,
            group
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createGroup,
    getMyGroups,
    getGroupById,
    getGroupByIdFromMemory
};