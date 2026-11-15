
const { randomUUID } = require("crypto");

// Temporary storage for payment testing
let payments = [];

// 1. Create a payment
const createPayment = (req, res) => {
    try {
        const { groupId, to, amount, paymentMethod } = req.body;

        if (!groupId || !to || amount === undefined || !paymentMethod) {
            return res.status(400).json({
                success: false,
                message: "Please provide groupId, to, amount and paymentMethod"
            });
        }

        const numericAmount = Number(amount);

        if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
            return res.status(400).json({
                success: false,
                message: "Payment amount must be greater than zero"
            });
        }

        if (to === req.user.id) {
            return res.status(400).json({
                success: false,
                message: "You cannot make a payment to yourself"
            });
        }

        const allowedMethods = ["UPI", "Cash", "Bank Transfer"];

        if (!allowedMethods.includes(paymentMethod)) {
            return res.status(400).json({
                success: false,
                message: "Invalid payment method"
            });
        }

        const newPayment = {
            id: randomUUID(),
            groupId,
            from: req.user.id,
            to,
            amount: Math.round(numericAmount * 100) / 100,
            paymentMethod,
            status: "Pending",
            createdAt: new Date(),
            updatedAt: new Date()
        };

        payments.push(newPayment);

        return res.status(201).json({
            success: true,
            message: "Payment recorded successfully",
            payment: newPayment
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// 2. Get all payments for a group
const getGroupPayments = (req, res) => {
    try {
        const { groupId } = req.params;

        const groupPayments = payments.filter(
            payment => payment.groupId === groupId
        );

        return res.status(200).json({
            success: true,
            count: groupPayments.length,
            payments: groupPayments
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// 3. Update payment status
const updatePaymentStatus = (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const payment = payments.find(
            item => item.id === id
        );

        // Ensure the payment belongs to the authorized group
if (payment.groupId !== req.group.id) {
    return res.status(403).json({
        success: false,
        message: "This payment does not belong to the specified group"
    });
}

        // Only the person who recorded the payment can update it
        if (payment.from !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to update this payment"
            });
        }

        const allowedStatuses = ["Pending", "Completed", "Failed"];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid payment status"
            });
        }

        payment.status = status;
        payment.updatedAt = new Date();

        return res.status(200).json({
            success: true,
            message: "Payment status updated successfully",
            payment
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


module.exports = {
    createPayment,
    getGroupPayments,
    updatePaymentStatus
};
