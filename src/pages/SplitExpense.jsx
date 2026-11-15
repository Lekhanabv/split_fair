
import React, { useState } from "react";
import {
  Users,
  Wallet,
  Receipt,
  UsersRound,
  Split,
  CheckCircle2
} from "lucide-react";

const money = (value) =>
  "₹" + Number(value || 0).toLocaleString("en-IN");

function SplitExpense({ groups, addExpense }) {
  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");
  const [members, setMembers] = useState("You, Rahul, Priya");
  const [group, setGroup] = useState("");

  const people = members
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);

  const share =
    Number(amount) > 0 && people.length
      ? Number(amount) / people.length
      : 0;

  const submit = (e) => {
    e.preventDefault();

    if (share <= 0) {
      return alert("Enter a valid amount and members.");
    }

    addExpense({
      title,
      amount: Number(amount),
      category: "Other",
      paidBy: "You",
      group: group || "Personal",
      emoji: "🤝",
      splitWith: people,
      share
    });

    setTitle("");
    setAmount("");
    alert("Split expense saved!");
  };

  return (
    <div className="split-page">
      <style>{`
        .split-page {
          max-width: 760px;
          margin: 0 auto;
          color: #34466b;
        }

        .split-heading {
          margin-bottom: 20px;
        }

        .split-heading h2 {
          font-size: 23px;
          font-weight: 750;
          color: #293c68;
        }

        .split-heading p {
          color: #8491ad;
          font-size: 13px;
          margin-top: 5px;
        }

        .split-layout {
          display: grid;
          grid-template-columns: minmax(0, 1.35fr) minmax(210px, 0.8fr);
          gap: 15px;
          align-items: start;
        }

        .split-form-card,
        .split-preview-card {
          background: #fff;
          border: 1px solid #e9edf6;
          border-radius: 15px;
          padding: 18px;
          box-shadow: 0 5px 18px rgba(65, 83, 130, 0.045);
        }

        .split-card-heading {
          display: flex;
          align-items: center;
          gap: 9px;
          font-size: 15px;
          font-weight: 700;
          color: #394d78;
          margin-bottom: 17px;
        }

        .split-card-icon {
          width: 34px;
          height: 34px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #eaf0ff;
          color: #627fc2;
        }

        .split-field {
          margin-bottom: 14px;
        }

        .split-field label {
          display: block;
          font-size: 12px;
          font-weight: 650;
          color: #62718f;
          margin-bottom: 6px;
        }

        .split-field input,
        .split-field select {
          width: 100%;
          border: 1px solid #e3e8f2;
          background: #fafbff;
          border-radius: 9px;
          padding: 10px 11px;
          font-size: 13px;
          color: #405174;
          outline: none;
          transition: border-color .2s, box-shadow .2s;
        }

        .split-field input:focus,
        .split-field select:focus {
          border-color: #9aafe0;
          box-shadow: 0 0 0 3px rgba(120, 148, 210, .12);
        }

        .split-field input::placeholder {
          color: #aab4c7;
        }

        .split-preview-card {
          background: linear-gradient(145deg, #edf3ff, #f5f1ff);
          border-color: #e4e8f8;
        }

        .split-preview-label {
          color: #7f8cac;
          font-size: 12px;
        }

        .split-preview-amount {
          font-size: 25px;
          font-weight: 800;
          color: #536fae;
          margin-top: 6px;
          overflow-wrap: anywhere;
        }

        .split-preview-divider {
          height: 1px;
          background: #dfe5f3;
          margin: 16px 0;
        }

        .split-preview-stat {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: #7887a5;
          padding: 6px 0;
        }

        .split-preview-stat strong {
          color: #52668f;
          font-size: 13px;
        }

        .split-member-list {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 10px;
        }

        .split-member-chip {
          background: rgba(255,255,255,.75);
          border: 1px solid #e0e6f4;
          color: #63769e;
          border-radius: 20px;
          padding: 5px 9px;
          font-size: 11px;
        }

        .split-save-btn {
          width: 100%;
          border: none;
          border-radius: 9px;
          background: linear-gradient(110deg, #6888ca, #8879c5);
          color: white;
          padding: 11px 15px;
          font-size: 13px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          margin-top: 5px;
          transition: transform .2s, opacity .2s;
        }

        .split-save-btn:hover {
          opacity: .93;
          transform: translateY(-1px);
        }

        .split-note {
          margin-top: 13px;
          font-size: 11px;
          color: #8996af;
          line-height: 1.5;
        }

        @media (max-width: 600px) {
          .split-layout {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="split-heading">
        <h2>Split Expense</h2>
        <p>Share expenses equally with your group members.</p>
      </div>

      <div className="split-layout">
        <form className="split-form-card" onSubmit={submit}>
          <div className="split-card-heading">
            <div className="split-card-icon">
              <Receipt size={18} />
            </div>
            Expense details
          </div>

          <div className="split-field">
            <label>Expense name</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Example: Weekend dinner"
              required
            />
          </div>

          <div className="split-field">
            <label>Total amount (₹)</label>
            <input
              type="number"
              min="0.01"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter total amount"
              required
            />
          </div>

          <div className="split-field">
            <label>Members (comma separated)</label>
            <input
              value={members}
              onChange={(e) => setMembers(e.target.value)}
              placeholder="You, Rahul, Priya"
              required
            />
          </div>

          <div className="split-field">
            <label>Select group</label>
            <select
              value={group}
              onChange={(e) => setGroup(e.target.value)}
            >
              <option value="">Personal</option>
              {groups.map((g) => (
                <option key={g.id} value={g.name}>
                  {g.name}
                </option>
              ))}
            </select>
          </div>

          <button className="split-save-btn" type="submit">
            <CheckCircle2 size={17} />
            Save Split Expense
          </button>
        </form>

        <div>
          <div className="split-preview-card">
            <div className="split-card-heading">
              <div className="split-card-icon">
                <Split size={18} />
              </div>
              Split summary
            </div>

            <div className="split-preview-label">
              Each person pays
            </div>

            <div className="split-preview-amount">
              {money(share)}
            </div>

            <div className="split-preview-divider" />

            <div className="split-preview-stat">
              <span>Total expense</span>
              <strong>{money(amount)}</strong>
            </div>

            <div className="split-preview-stat">
              <span>Members</span>
              <strong>{people.length}</strong>
            </div>

            <div className="split-preview-stat">
              <span>Split type</span>
              <strong>Equal</strong>
            </div>

            <div className="split-preview-divider" />

            <div className="split-preview-label">
              <UsersRound size={14} style={{ display: "inline", marginRight: 5 }} />
              Included members
            </div>

            <div className="split-member-list">
              {people.length ? (
                people.map((person, index) => (
                  <span className="split-member-chip" key={`${person}-${index}`}>
                    {person}
                  </span>
                ))
              ) : (
                <span className="split-member-chip">No members added</span>
              )}
            </div>
          </div>

          <p className="split-note">
            <Wallet size={13} style={{ display: "inline", marginRight: 5 }} />
            The total amount is divided equally among all entered members.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SplitExpense;
