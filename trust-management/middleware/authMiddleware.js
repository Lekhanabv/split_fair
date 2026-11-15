const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token || !token.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Not authorized. Please login."
            });
        }

        const actualToken = token.split(" ")[1];

        const decoded = jwt.verify(
            actualToken,
            process.env.JWT_SECRET
        );

        const user = await User.findById(decoded.id).select("-password");

        if (!user || !user.isActive) {
            return res.status(401).json({
                message: "User not found or account inactive"
            });
        }

        req.user = user;
        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

module.exports = { protect };
