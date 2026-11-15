const crypto = require("crypto");

// Generate a unique hash for a receipt
const generateReceiptHash = (fileBuffer) => {
    return crypto
        .createHash("sha256")
        .update(fileBuffer)
        .digest("hex");
};

module.exports = generateReceiptHash;