const User = require("./models/User");
const Group = require("./models/Group");
const Expense = require("./models/Expense");
const Receipt = require("./models/Receipt");
const Settlement = require("./models/Settlement");
const Payment = require("./models/Payment");
const Verification = require("./models/Verification");
const Dispute = require("./models/Dispute");
const TrustScore = require("./models/TrustScore");

console.log("All SplitFair Models Loaded Successfully!");

console.log("1. User:", User.modelName);
console.log("2. Group:", Group.modelName);
console.log("3. Expense:", Expense.modelName);
console.log("4. Receipt:", Receipt.modelName);
console.log("5. Settlement:", Settlement.modelName);
console.log("6. Payment:", Payment.modelName);
console.log("7. Verification:", Verification.modelName);
console.log("8. Dispute:", Dispute.modelName);
console.log("9. TrustScore:", TrustScore.modelName);