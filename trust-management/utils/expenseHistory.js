const Expense = require("../models/Expense");

const recordExpenseModification = async (
    expenseId,
    userId,
    changes
) => {
    const expense = await Expense.findById(expenseId);

    if (!expense) {
        throw new Error("Expense not found");
    }

    expense.modificationHistory.push({
        modifiedBy: userId,
        modifiedAt: new Date(),
        changes: changes
    });

    await expense.save();

    return expense;
};

module.exports = recordExpenseModification;