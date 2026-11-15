
const calculateShares = (amount, splitType, participants) => {
    const totalCents = Math.round(Number(amount) * 100);

    if (!Number.isFinite(totalCents) || totalCents <= 0) {
        throw new Error("Invalid expense amount");
    }

    if (!Array.isArray(participants) || participants.length === 0) {
        throw new Error("At least one participant is required");
    }

    const userIds = participants.map(p => p.userId);

    if (
        userIds.some(id => !id) ||
        new Set(userIds).size !== userIds.length
    ) {
        throw new Error("Participants must have unique user IDs");
    }

    let shares = [];

    // EQUAL SPLIT
    if (splitType === "equal") {
        const baseShare = Math.floor(totalCents / participants.length);
        let remaining = totalCents;

        shares = participants.map((participant, index) => {
            const shareCents =
                index === participants.length - 1
                    ? remaining
                    : baseShare;

            remaining -= shareCents;

            return {
                userId: participant.userId,
                shareAmount: shareCents / 100
            };
        });
    }

    // PERCENTAGE SPLIT
    else if (splitType === "percentage") {
        const percentages = participants.map(p => Number(p.percentage));

        if (
            percentages.some(p => !Number.isFinite(p) || p < 0) ||
            Math.abs(percentages.reduce((a, b) => a + b, 0) - 100) > 0.000001
        ) {
            throw new Error("Participant percentages must total 100");
        }

        let remaining = totalCents;

        shares = participants.map((participant, index) => {
            const shareCents =
                index === participants.length - 1
                    ? remaining
                    : Math.round(totalCents * Number(participant.percentage) / 100);

            remaining -= shareCents;

            return {
                userId: participant.userId,
                percentage: Number(participant.percentage),
                shareAmount: shareCents / 100
            };
        });
    }

    // CUSTOM SPLIT
    else if (splitType === "custom") {
        const customAmounts = participants.map(
            p => Number(p.shareAmount)
        );

        if (
            customAmounts.some(
                value => !Number.isFinite(value) || value < 0
            )
        ) {
            throw new Error("Custom shares must be valid non-negative amounts");
        }

        const customTotal = customAmounts.reduce(
            (sum, value) => sum + Math.round(value * 100),
            0
        );

        if (customTotal !== totalCents) {
            throw new Error("Custom shares must add up to the total expense");
        }

        shares = participants.map((participant, index) => ({
            userId: participant.userId,
            shareAmount: Math.round(customAmounts[index] * 100) / 100
        }));
    }

    else {
        throw new Error("Invalid split type");
    }

    return shares;
};

module.exports = { calculateShares };
