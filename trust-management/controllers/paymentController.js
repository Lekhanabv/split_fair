const Payment = require("../models/Payment");

// Confirm a payment
exports.confirmPayment = async (req, res) => {
    try {
        const { paymentId } = req.params;
        const userId = req.user._id;

        const payment = await Payment.findById(paymentId);

        if (!payment) {
            return res.status(404).json({
                message: "Payment not found"
            });
        }

        if (payment.status === "Completed") {
            return res.status(400).json({
                message: "Payment is already completed"
            });
        }

        if (payment.status === "Disputed") {
            return res.status(400).json({
                message: "This payment is disputed"
            });
        }

        if (payment.payer.toString() === userId.toString()) {
            payment.payerConfirmed = true;
        } 
        else if (payment.receiver.toString() === userId.toString()) {
            payment.receiverConfirmed = true;
        } 
        else {
            return res.status(403).json({
                message: "You are not part of this payment"
            });
        }

        // Complete payment only after both users confirm
        if (payment.payerConfirmed && payment.receiverConfirmed) {
            payment.status = "Completed";
            payment.paidAt = new Date();
        }

        await payment.save();

        res.status(200).json({
            message: payment.status === "Completed"
                ? "Payment confirmed by both users"
                : "Your confirmation recorded. Waiting for the other user.",
            payment
        });

    } catch (error) {
        res.status(500).json({
            message: "Payment confirmation failed",
            error: error.message
        });
    }
};