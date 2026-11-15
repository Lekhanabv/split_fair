
import React from "react";
import {
  Wallet,
  Users,
  TrendingUp,
  Receipt
} from "lucide-react";

const money = (value) =>
  "₹" + Number(value || 0).toLocaleString("en-IN");

function Balances({ expenses }) {
  const totals = {};

  expenses.forEach((e) => {
    const people = e.splitWith?.length
      ? e.splitWith
      : [e.paidBy || "You"];

    people.forEach((person) => {
      totals[person] =
        (totals[person] || 0) +
        Number(e.amount || 0) / people.length;
    });
  });

  const members = Object.entries(totals);
  const totalAmount = members.reduce(
    (sum, [, amount]) => sum + amount,
    0
  );

  return (
    <div className="balance-page">
      <style>{`
        .balance-page {
          max-width: 760px;
          margin: 0 auto;
          color: #34466b;
        }

        .balance-heading {
          margin-bottom: 20px;
        }

        .balance-heading h2 {
          font-size: 23px;
          font-weight: 750;
          color: #293c68;
        }

        .balance-heading p {
          color: #8491ad;
          font-size: 13px;
          margin-top: 5px;
        }

        .balance-summary {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 13px;
          margin-bottom: 18px;
        }

        .balance-summary-card {
          padding: 17px;
          border-radius: 15px;
          background: linear-gradient(135deg, #edf3ff, #f2efff);
          border: 1px solid #e3e9fb;
        }

        .balance-summary-card.purple {
          background: linear-gradient(135deg, #f1efff, #f8f2ff);
          border-color: #e9e2fa;
        }

        .balance-icon {
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          background: #dce8ff;
          color: #5577c4;
          margin-bottom: 12px;
        }

        .purple .balance-icon {
          background: #e8dfff;
          color: #8466bd;
        }

        .balance-label {
          color: #8390aa;
          font-size: 12px;
        }

        .balance-value {
          font-size: 21px;
          font-weight: 750;
          color: #344b7a;
          margin-top: 4px;
        }

        .balance-list {
          background: #fff;
          border: 1px solid #e9edf6;
          border-radius: 15px;
          padding: 17px;
          box-shadow: 0 5px 18px rgba(65, 83, 130, 0.045);
        }

        .balance-list-heading {
          display: flex;
          align-items: center;
          gap: 9px;
          margin-bottom: 13px;
          font-size: 15px;
          font-weight: 700;
          color: #394d78;
        }

        .balance-member {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 12px 4px;
          border-bottom: 1px solid #f0f2f8;
        }

        .balance-member:last-child {
          border-bottom: none;
        }

        .balance-member-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .balance-avatar {
          width: 34px;
          height: 34px;
          border-radius: 11px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #edf2ff;
          color: #607bb9;
          font-weight: 700;
          font-size: 13px;
        }

        .balance-member-name {
          font-size: 13px;
          font-weight: 650;
          color: #465879;
        }

        .balance-member-caption {
          font-size: 11px;
          color: #9aa5ba;
          margin-top: 2px;
        }

        .balance-member-amount {
          font-size: 14px;
          font-weight: 750;
          color: #526fae;
        }

        .balance-empty {
          text-align: center;
          padding: 30px 12px;
          color: #8d99b0;
          font-size: 13px;
        }

        .balance-empty-icon {
          width: 48px;
          height: 48px;
          border-radius: 15px;
          background: #f0f3ff;
          color: #7b8fc7;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 12px;
        }

        @media (max-width: 520px) {
          .balance-summary {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="balance-heading">
        <h2>Balances</h2>
        <p>Get a clear view of everyone's expense shares.</p>
      </div>

      <div className="balance-summary">
        <div className="balance-summary-card">
          <div className="balance-icon">
            <Wallet size={18} />
          </div>
          <div className="balance-label">Total shared expenses</div>
          <div className="balance-value">{money(totalAmount)}</div>
        </div>

        <div className="balance-summary-card purple">
          <div className="balance-icon">
            <Users size={18} />
          </div>
          <div className="balance-label">Members involved</div>
          <div className="balance-value">{members.length}</div>
        </div>
      </div>

      <div className="balance-list">
        <div className="balance-list-heading">
          <Receipt size={18} />
          Member expense shares
        </div>

        {members.length > 0 ? (
          members.map(([person, amount]) => (
            <div className="balance-member" key={person}>
              <div className="balance-member-left">
                <div className="balance-avatar">
                  {person.charAt(0).toUpperCase()}
                </div>

                <div>
                  <div className="balance-member-name">{person}</div>
                  <div className="balance-member-caption">
                    Expense share
                  </div>
                </div>
              </div>

              <div className="balance-member-amount">
                {money(amount)}
              </div>
            </div>
          ))
        ) : (
          <div className="balance-empty">
            <div className="balance-empty-icon">
              <TrendingUp size={22} />
            </div>
            No balance information yet.
            <br />
            Add or split an expense first.
          </div>
        )}
      </div>
    </div>
  );
}

export default Balances;
