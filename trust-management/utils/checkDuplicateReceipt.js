const Receipt = require("../models/Receipt");

// Check whether a receipt already exists
const checkDuplicateReceipt = async (fileHash) => {
    const existingReceipt = await Receipt.findOne({
        fileHash: fileHash
    });

    return existingReceipt !== null;
};

module.exports = checkDuplicateReceipt;