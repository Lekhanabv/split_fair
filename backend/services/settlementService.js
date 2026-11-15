
const calculateSettlements = (balances) => {

    // People who need to pay money
    const debtors = balances
        .filter(user => user.netBalance < 0)
        .map(user => ({
            userId: user.userId,
            amount: Math.round(Math.abs(user.netBalance) * 100)
        }));

    // People who need to receive money
    const creditors = balances
        .filter(user => user.netBalance > 0)
        .map(user => ({
            userId: user.userId,
            amount: Math.round(user.netBalance * 100)
        }));

    const settlements = [];

    let debtorIndex = 0;
    let creditorIndex = 0;

    // Match debtors with creditors
    while (
        debtorIndex < debtors.length &&
        creditorIndex < creditors.length
    ) {
        const amount = Math.min(
            debtors[debtorIndex].amount,
            creditors[creditorIndex].amount
        );

        settlements.push({
            from: debtors[debtorIndex].userId,
            to: creditors[creditorIndex].userId,
            amount: amount / 100
        });

        debtors[debtorIndex].amount -= amount;
        creditors[creditorIndex].amount -= amount;

        if (debtors[debtorIndex].amount === 0) {
            debtorIndex++;
        }

        if (creditors[creditorIndex].amount === 0) {
            creditorIndex++;
        }
    }

    return settlements;
};

module.exports = { calculateSettlements };
