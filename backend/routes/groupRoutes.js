
const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
    createGroup,
    getMyGroups,
    getGroupById
} = require("../controllers/groupController");

// All group routes require login
router.use(protect);

router.post("/", createGroup);
router.get("/", getMyGroups);
router.get("/:id", getGroupById);

module.exports = router;
