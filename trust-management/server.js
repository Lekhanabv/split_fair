const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

// Import routes
const verificationRoutes = require("./routes/verificationRoutes");
const disputeRoutes = require("./routes/disputeRoutes");
const trustRoutes = require("./routes/trustRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Use routes
app.use("/api/verification", verificationRoutes);
app.use("/api/disputes", disputeRoutes);
app.use("/api/trust", trustRoutes);
app.use("/api/payments", paymentRoutes);

// Home route
app.get("/", (req, res) => {
    res.send("SplitFair Trust Management Server Running!");
});

// Start server
const startServer = async () => {
    await connectDB();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();