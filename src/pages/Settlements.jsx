
import React, { useState } from "react";
import {
  Wallet,
  CheckCircle,
  Clock,
  Receipt,
  ArrowDownLeft
} from "lucide-react";

const money = (value) =>
  "₹" + Number(value || 0).toLocaleString("en-IN");

function Settlements({ settlements, addSettlement }) {
  const [person, setPerson] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("Completed");

  const submit = e => {
    e.preventDefault();

    if (Number(amount) <= 0) {
      return alert("Enter a valid amount.");
    }

    addSettlement({
      person,
      amount: Number(amount),
      status
    });

    setPerson("");
    setAmount("");
    setStatus("Completed");
  };

  const completed = settlements
    .filter(s => s.status === "Completed")
    .reduce((sum, s) => sum + Number(s.amount || 0), 0);

  const pending = settlements
    .filter(s => s.status === "Pending")
    .reduce((sum, s) => sum + Number(s.amount || 0), 0);

  return (
    <div className="settlement-page">

      <div className="settlement-heading">
        <div>
          <p className="settlement-eyebrow">PAYMENT MANAGEMENT</p>
          <h2>Settlements</h2>
          <p>Record payments and track settlement history.</p>
        </div>

        <div className="settlement-heading-icon">
          <ArrowDownLeft size={22} />
        </div>
      </div>

      <div className="settlement-stats">
        <div className="settlement-stat completed">
          <div className="settlement-stat-icon">
            <CheckCircle size={18} />
          </div>
          <div>
            <p>Completed</p>
            <h3>{money(completed)}</h3>
          </div>
        </div>

        <div className="settlement-stat pending">
          <div className="settlement-stat-icon">
            <Clock size={18} />
          </div>
          <div>
            <p>Pending</p>
            <h3>{money(pending)}</h3>
          </div>
        </div>
      </div>

      <form onSubmit={submit} className="settlement-form">
        <div className="settlement-form-heading">
          <div className="settlement-form-icon">
            <Wallet size={18} />
          </div>
          <div>
            <h3>Record a Payment</h3>
            <p>Add a new settlement entry.</p>
          </div>
        </div>

        <div className="settlement-fields">
          <div>
            <label>Member Name</label>
            <input
              value={person}
              onChange={e => setPerson(e.target.value)}
              placeholder="Enter member name"
              required
            />
          </div>

          <div>
            <label>Amount (₹)</label>
            <input
              type="number"
              min="0.01"
              step="0.01"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="Enter amount"
              required
            />
          </div>

          <div>
            <label>Payment Status</label>
            <select
              value={status}
              onChange={e => setStatus(e.target.value)}
            >
              <option>Completed</option>
              <option>Pending</option>
            </select>
          </div>
        </div>

        <button type="submit" className="settlement-submit">
          <CheckCircle size={15} />
          Record Settlement
        </button>
      </form>

      <div className="settlement-history">
        <div className="settlement-history-heading">
          <div>
            <h3>Payment History</h3>
            <p>Your recorded payment activities</p>
          </div>
          <Receipt size={19} />
        </div>

        {settlements.length > 0 ? (
          <div>
            {settlements.map(s => (
              <div className="settlement-row" key={s.id}>
                <div className="settlement-member">
                  <div className="settlement-member-icon">
                    <Wallet size={16} />
                  </div>
                  <div>
                    <h4>{s.person}</h4>
                    <p>{s.date}</p>
                  </div>
                </div>

                <div className="settlement-payment">
                  <strong>{money(s.amount)}</strong>
                  <span className={
                    s.status === "Completed"
                      ? "status-completed"
                      : "status-pending"
                  }>
                    {s.status === "Completed"
                      ? <CheckCircle size={11} />
                      : <Clock size={11} />}
                    {s.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="settlement-empty">
            <div>
              <Receipt size={24} />
            </div>
            <h4>No settlements yet</h4>
            <p>Your recorded payments will appear here.</p>
          </div>
        )}
      </div>

      <style>{`
        .settlement-page {
          max-width: 850px;
          margin: 0 auto;
        }

        .settlement-heading {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 17px;
        }

        .settlement-eyebrow {
          color: #8993b1;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.3px;
          margin-bottom: 5px;
        }

        .settlement-heading h2 {
          color: #465775;
          font-size: 21px;
          font-weight: 700;
        }

        .settlement-heading p:last-child {
          color: #929bb1;
          font-size: 12px;
          margin-top: 4px;
        }

        .settlement-heading-icon {
          width: 42px;
          height: 42px;
          border-radius: 13px;
          background: #e9eafa;
          color: #7885b5;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .settlement-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 15px;
        }

        .settlement-stat {
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 13px;
          border-radius: 12px;
          border: 1px solid;
        }

        .settlement-stat.completed {
          background: #edf5ef;
          border-color: #e0ede3;
          color: #729985;
        }

        .settlement-stat.pending {
          background: #f2effa;
          border-color: #e8e2f3;
          color: #9181b5;
        }

        .settlement-stat-icon {
          width: 35px;
          height: 35px;
          background: rgba(255,255,255,.65);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .settlement-stat p {
          font-size: 11px;
          color: #8290a4;
        }

        .settlement-stat h3 {
          font-size: 16px;
          font-weight: 700;
          margin-top: 3px;
          color: #596b84;
        }

        .settlement-form,
        .settlement-history {
          background: #faf9ff;
          border: 1px solid #e5e6f2;
          border-radius: 14px;
          padding: 17px 19px;
          box-shadow: 0 3px 12px rgba(82,91,135,.04);
        }

        .settlement-form {
          margin-bottom: 15px;
        }

        .settlement-form-heading {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 15px;
        }

        .settlement-form-icon {
          width: 35px;
          height: 35px;
          border-radius: 10px;
          background: #e9eafa;
          color: #7885b5;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .settlement-form-heading h3,
        .settlement-history-heading h3 {
          font-size: 14px;
          font-weight: 700;
          color: #4c5d7b;
        }

        .settlement-form-heading p,
        .settlement-history-heading p {
          font-size: 10px;
          color: #929bb1;
          margin-top: 3px;
        }

        .settlement-fields {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 11px;
        }

        .settlement-fields label {
          display: block;
          color: #63718e;
          font-size: 11px;
          font-weight: 700;
          margin-bottom: 6px;
        }

        .settlement-fields input,
        .settlement-fields select {
          width: 100%;
          padding: 9px 10px;
          border: 1px solid #e0e3f0;
          border-radius: 8px;
          background: #f8f8fe;
          outline: none;
          color: #45536d;
          font-size: 11px;
        }

        .settlement-fields input:focus,
        .settlement-fields select:focus {
          border-color: #9ba8d0;
          box-shadow: 0 0 0 3px #e9eafa;
        }

        .settlement-submit {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          padding: 9px 13px;
          margin-top: 15px;
          border-radius: 9px;
          background: linear-gradient(120deg, #718abd, #8988bd);
          color: white;
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
        }

        .settlement-history-heading {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #8793b5;
          padding-bottom: 12px;
          border-bottom: 1px solid #e9eaf3;
          margin-bottom: 5px;
        }

        .settlement-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 11px 0;
          border-bottom: 1px solid #eff0f6;
        }

        .settlement-row:last-child {
          border-bottom: 0;
        }

        .settlement-member {
          display: flex;
          align-items: center;
          gap: 9px;
          min-width: 0;
        }

        .settlement-member-icon {
          width: 33px;
          height: 33px;
          flex-shrink: 0;
          border-radius: 10px;
          background: #e9eafa;
          color: #7885b5;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .settlement-member h4 {
          color: #52627f;
          font-size: 12px;
          font-weight: 700;
        }

        .settlement-member p {
          color: #929bb1;
          font-size: 10px;
          margin-top: 3px;
        }

        .settlement-payment {
          display: flex;
          align-items: flex-end;
          flex-direction: column;
          gap: 5px;
        }

        .settlement-payment strong {
          color: #596b8d;
          font-size: 12px;
        }

        .settlement-payment span {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 4px 7px;
          border-radius: 20px;
          font-size: 9px;
          font-weight: 600;
        }

        .status-completed {
          background: #e6f1e9;
          color: #6f987e;
        }

        .status-pending {
          background: #eee9f8;
          color: #8d7cb3;
        }

        .settlement-empty {
          text-align: center;
          padding: 25px 10px;
        }

        .settlement-empty div {
          width: 44px;
          height: 44px;
          margin: 0 auto 9px;
          border-radius: 13px;
          background: #eeecfa;
          color: #8a7eb7;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .settlement-empty h4 {
          color: #596b8d;
          font-size: 13px;
        }

        .settlement-empty p {
          color: #929bb1;
          font-size: 11px;
          margin-top: 4px;
        }

        @media (max-width: 650px) {
          .settlement-fields {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 450px) {
          .settlement-stats {
            grid-template-columns: 1fr;
          }

          .settlement-form,
          .settlement-history {
            padding: 13px;
          }
        }
      `}</style>
    </div>
  );
}

export default Settlements;
