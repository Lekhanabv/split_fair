const mongoose = require("mongoose");
const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();

async function testConnection() {
    try {
        console.log("Testing MongoDB connection...");

        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 15000
        });

        console.log("MongoDB Connected Successfully!");

        await mongoose.disconnect();
    } catch (error) {
        console.log("Connection Error:", error.message);

        if (error.reason) {
            for (const [host, server] of error.reason.servers) {
                console.log("Server:", host);
                console.log("Error:", server.error?.message);
            }
        }
    }
}

testConnection();