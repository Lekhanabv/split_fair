
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

// Import routes
const authRoutes = require("./routes/authRoutes");
const groupRoutes = require("./routes/groupRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();

// -------------------- MIDDLEWARE --------------------

// Enable CORS
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Add security headers
app.use(helmet());

// Rate limiter: maximum 100 requests per 15 minutes per IP
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too many requests. Please try again later."
    }
});

// Apply rate limiter to all API routes
app.use("/api", apiLimiter);

// -------------------- API ROUTES --------------------

app.use("/api/auth", authRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/payments", paymentRoutes);

// -------------------- TEST ROUTE --------------------

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to SplitFair Backend API"
    });
});

// -------------------- ERROR HANDLER --------------------

app.use((err, req, res, next) => {
    console.error("Server Error:", err.message);

    res.status(err.status || 500).json({
        success: false,
        message: err.status ? err.message : "Internal Server Error"
    });
});

// -------------------- START SERVER --------------------

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`SplitFair Server running on port ${PORT}`);
});
