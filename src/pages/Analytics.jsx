
import React from "react";
import {
  Wallet,
  Utensils,
  Plane,
  ShoppingBag,
  Music,
  Receipt,
  MoreHorizontal,
  ChartNoAxesCombined
} from "lucide-react";

const money = (value) =>
  "₹" + Number(value || 0).toLocaleString("en-IN");

const categoryDetails = {
  Food: { icon: Utensils, color: "food", label: "Food" },
  Travel: { icon: Plane, color: "travel", label: "Travel" },
  Shopping: { icon: ShoppingBag, color: "shopping", label: "Shopping" },
  Entertainment: { icon: Music, color: "entertainment", label: "Entertainment" },
  Bills: { icon: Receipt, color: "bills", label: "Bills" },
  Other: { icon: MoreHorizontal, color: "other", label: "Other" }
};

function Analytics({ expenses }) {
  const categories = Object.keys(categoryDetails);

  const total = expenses.reduce(
    (sum, e) => sum + Number(e.amount || 0),
    0
  );

  const values = categories.map(category => ({
    category,
    amount: expenses
      .filter(e => e.category === category)
      .reduce((sum, e) => sum + Number(e.amount || 0), 0),
    ...categoryDetails[category]
  }));

  const max = Math.max(...values.map(v => v.amount), 1);

  const highest = [...values].sort(
    (a, b) => b.amount - a.amount
  )[0];

  return (
    <div className="analytics-page">

      <div className="analytics-heading">
        <div>
          <p className="analytics-eyebrow">YOUR MONEY OVERVIEW</p>
          <h2>Analytics</h2>
          <p className="muted">
            A simple view of your shared spending.
          </p>
        </div>

        <div className="analytics-heading-icon">
          <ChartNoAxesCombined size={22} />
        </div>
      </div>

      <div className="analytics-summary">
        <div className="analytics-summary-icon">
          <Wallet size={21} />
        </div>

        <div>
          <p>Total Recorded Spending</p>
          <h3>{money(total)}</h3>
          <span>{expenses.length} recorded expenses</span>
        </div>
      </div>

      <div className="analytics-content">

        <div className="analytics-section-heading">
          <div>
            <h3>Spending by Category</h3>
            <p>See how your expenses are distributed</p>
          </div>
          <span className="analytics-small-icon">
            <ChartNoAxesCombined size={17} />
          </span>
        </div>

        {expenses.length > 0 ? (
          <>
            <div className="analytics-highlight">
              <div>
                <span className="muted">Highest spending</span>
                <h4>{highest.category}</h4>
              </div>
              <strong>{money(highest.amount)}</strong>
            </div>

            <div className="analytics-list">
              {values.map(item => {
                const Icon = item.icon;
                const percentage = total
                  ? (item.amount / total) * 100
                  : 0;

                return (
                  <div className="analytics-item" key={item.category}>
                    <div className="analytics-item-top">
                      <div className="analytics-category">
                        <div className={`analytics-category-icon ${item.color}`}>
                          <Icon size={17} />
                        </div>
                        <div>
                          <p>{item.label}</p>
                          <span>{percentage.toFixed(1)}% of spending</span>
                        </div>
                      </div>

                      <strong>{money(item.amount)}</strong>
                    </div>

                    <div className="analytics-track">
                      <div
                        className={`analytics-fill ${item.color}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="analytics-empty">
            <div className="analytics-empty-icon">
              <ChartNoAxesCombined size={25} />
            </div>
            <h4>No analytics yet</h4>
            <p>Add some expenses to see your spending breakdown here.</p>
          </div>
        )}
      </div>

      <style>{`
        .analytics-page {
          max-width: 850px;
          margin: 0 auto;
        }

        .analytics-heading {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 18px;
        }

        .analytics-eyebrow {
          color: #8792b2;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.3px;
          margin-bottom: 5px;
        }

        .analytics-heading h2 {
          color: #465775;
          font-size: 21px;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .analytics-heading .muted {
          font-size: 12px;
        }

        .analytics-heading-icon {
          width: 42px;
          height: 42px;
          border-radius: 13px;
          background: #e7eafa;
          color: #7183b5;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .analytics-summary {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 17px 19px;
          border-radius: 14px;
          background: linear-gradient(120deg, #e1eafa, #eee7f8);
          border: 1px solid #dfe4f3;
          margin-bottom: 17px;
        }

        .analytics-summary-icon {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: #f8f8ff;
          color: #7084b7;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .analytics-summary p {
          font-size: 12px;
          color: #7885a5;
        }

        .analytics-summary h3 {
          font-size: 23px;
          font-weight: 700;
          color: #526b9d;
          margin: 3px 0;
        }

        .analytics-summary span {
          font-size: 10px;
          color: #8b96b0;
        }

        .analytics-content {
          padding: 17px 19px;
          background: #faf9ff;
          border: 1px solid #e5e6f2;
          border-radius: 14px;
          box-shadow: 0 3px 12px rgba(82, 91, 135, 0.04);
        }

        .analytics-section-heading {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 13px;
        }

        .analytics-section-heading h3 {
          font-size: 15px;
          font-weight: 700;
          color: #4c5d7b;
        }

        .analytics-section-heading p {
          font-size: 11px;
          color: #929bb1;
          margin-top: 3px;
        }

        .analytics-small-icon {
          width: 31px;
          height: 31px;
          border-radius: 9px;
          background: #eeecfa;
          color: #897db5;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .analytics-highlight {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #f0effa;
          border: 1px solid #e8e5f5;
          border-radius: 10px;
          padding: 10px 12px;
          margin-bottom: 14px;
        }

        .analytics-highlight span {
          font-size: 10px;
        }

        .analytics-highlight h4 {
          color: #687ba7;
          font-size: 13px;
          font-weight: 700;
          margin-top: 3px;
        }

        .analytics-highlight strong {
          font-size: 13px;
          color: #6679a6;
        }

        .analytics-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .analytics-item {
          padding: 12px;
          background: #f4f5fc;
          border: 1px solid #e9eaf4;
          border-radius: 11px;
          min-width: 0;
        }

        .analytics-item-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 7px;
          margin-bottom: 10px;
        }

        .analytics-category {
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 0;
        }

        .analytics-category-icon {
          width: 31px;
          height: 31px;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .analytics-category p {
          font-size: 11px;
          font-weight: 700;
          color: #566580;
        }

        .analytics-category span {
          display: block;
          font-size: 9px;
          color: #9aa2b7;
          margin-top: 2px;
        }

        .analytics-item-top strong {
          color: #596b8d;
          font-size: 11px;
          white-space: nowrap;
        }

        .analytics-track {
          height: 6px;
          border-radius: 20px;
          background: #e7e9f3;
          overflow: hidden;
        }

        .analytics-fill {
          height: 100%;
          border-radius: 20px;
          min-width: 0;
          transition: width .3s ease;
        }

        .food { background: #e8edf9; color: #7086b7; }
        .travel { background: #e5f0f5; color: #6597a8; }
        .shopping { background: #f0eafa; color: #927eb8; }
        .entertainment { background: #f8eaf0; color: #b77e9b; }
        .bills { background: #e8f1eb; color: #729985; }
        .other { background: #f2edf0; color: #9b8198; }

        .analytics-fill.food { background: #879ac6; }
        .analytics-fill.travel { background: #80aeba; }
        .analytics-fill.shopping { background: #a18dc4; }
        .analytics-fill.entertainment { background: #c28ca6; }
        .analytics-fill.bills { background: #83a995; }
        .analytics-fill.other { background: #a991a7; }

        .analytics-empty {
          text-align: center;
          padding: 28px 12px;
        }

        .analytics-empty-icon {
          width: 48px;
          height: 48px;
          margin: 0 auto 10px;
          border-radius: 14px;
          background: #eeecfa;
          color: #8a7eb7;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .analytics-empty h4 {
          font-size: 13px;
          color: #596b8d;
          font-weight: 700;
        }

        .analytics-empty p {
          font-size: 11px;
          color: #929bb1;
          margin-top: 5px;
        }

        @media (max-width: 600px) {
          .analytics-list {
            grid-template-columns: 1fr;
          }

          .analytics-summary {
            padding: 14px;
          }

          .analytics-content {
            padding: 13px;
          }
        }
      `}</style>
    </div>
  );
}

export default Analytics;
