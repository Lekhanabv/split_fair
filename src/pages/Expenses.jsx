
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Search,
  Trash2,
  Receipt,
  Wallet,
  ArrowUpRight
} from "lucide-react";

const money = (value) =>
  "₹" + Number(value || 0).toLocaleString("en-IN");

function Expenses({ expenses, deleteExpense }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = expenses.filter((e) =>
    (e.title || "").toLowerCase().includes(search.toLowerCase()) &&
    (filter === "All" || e.category === filter)
  );

  const total = expenses.reduce(
    (sum, e) => sum + Number(e.amount || 0),
    0
  );

  return (
    <div className="expenses-page">
      <style>{`
        .expenses-page {
          max-width: 850px;
          margin: 0 auto;
          color: #34466b;
        }

        .expenses-heading {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-bottom: 19px;
          flex-wrap: wrap;
        }

        .expenses-heading h2 {
          font-size: 23px;
          font-weight: 750;
          color: #293c68;
        }

        .expenses-heading p {
          color: #8491ad;
          font-size: 13px;
          margin-top: 5px;
        }

        .expenses-add-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 9px 13px;
          border-radius: 9px;
          background: linear-gradient(110deg, #6888ca, #8879c5);
          color: white;
          font-size: 12px;
          font-weight: 700;
          text-decoration: none;
          white-space: nowrap;
        }

        .expenses-summary {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          padding: 18px;
          border-radius: 15px;
          background: linear-gradient(120deg, #eaf2ff, #f2efff);
          border: 1px solid #e3e9fa;
          margin-bottom: 15px;
        }

        .expenses-summary-label {
          color: #7e8dab;
          font-size: 12px;
        }

        .expenses-summary-value {
          font-size: 25px;
          font-weight: 800;
          color: #506da9;
          margin-top: 5px;
        }

        .expenses-summary-icon {
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 13px;
          background: rgba(255,255,255,.7);
          color: #6985c2;
        }

        .expenses-tools {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px;
          background: #fff;
          border: 1px solid #e9edf6;
          border-radius: 13px;
          margin-bottom: 16px;
        }

        .expenses-search {
          display: flex;
          align-items: center;
          gap: 9px;
          flex: 1;
          min-width: 0;
          color: #8b99b3;
        }

        .expenses-search input {
          width: 100%;
          min-width: 0;
          border: none;
          outline: none;
          font-size: 13px;
          color: #465879;
          background: transparent;
        }

        .expenses-search input::placeholder {
          color: #a5afc1;
        }

        .expenses-tools select {
          width: auto;
          min-width: 125px;
          border: 1px solid #e5eaf4;
          border-radius: 8px;
          padding: 8px 10px;
          font-size: 12px;
          color: #637494;
          background: #f9faff;
          outline: none;
        }

        .expenses-list {
          background: #fff;
          border: 1px solid #e9edf6;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 5px 18px rgba(65, 83, 130, 0.045);
        }

        .expenses-list-header {
          padding: 15px 17px;
          background: #f8f9ff;
          border-bottom: 1px solid #edf0f7;
        }

        .expenses-list-header h3 {
          font-size: 14px;
          font-weight: 750;
          color: #394d78;
        }

        .expenses-list-header p {
          font-size: 11px;
          color: #929db2;
          margin-top: 3px;
        }

        .expense-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          padding: 13px 17px;
          border-bottom: 1px solid #f0f2f8;
        }

        .expense-item:last-child {
          border-bottom: none;
        }

        .expense-item-left {
          display: flex;
          align-items: center;
          gap: 11px;
          min-width: 0;
        }

        .expense-emoji {
          width: 37px;
          height: 37px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 11px;
          background: #edf2ff;
          font-size: 17px;
        }

        .expense-title {
          font-size: 13px;
          font-weight: 700;
          color: #465879;
          overflow-wrap: anywhere;
        }

        .expense-meta {
          font-size: 11px;
          color: #8d99af;
          margin-top: 3px;
          overflow-wrap: anywhere;
        }

        .expense-date {
          font-size: 10px;
          color: #a2adc0;
          margin-top: 3px;
        }

        .expense-item-right {
          display: flex;
          align-items: center;
          gap: 11px;
          flex-shrink: 0;
        }

        .expense-amount {
          font-size: 13px;
          font-weight: 750;
          color: #536fae;
          white-space: nowrap;
        }

        .expense-delete {
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          border-radius: 8px;
          background: #fff0f1;
          color: #d17b87;
          cursor: pointer;
        }

        .expense-delete:hover {
          background: #ffe3e6;
        }

        .expenses-empty {
          padding: 30px 12px;
          text-align: center;
          color: #929db2;
          font-size: 13px;
        }

        .expenses-empty-icon {
          width: 45px;
          height: 45px;
          margin: 0 auto 10px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #edf2ff;
          color: #7189c4;
        }

        @media (max-width: 520px) {
          .expenses-tools {
            align-items: stretch;
            flex-direction: column;
          }

          .expenses-tools select {
            width: 100%;
          }

          .expense-item {
            padding: 12px;
          }

          .expense-item-right {
            gap: 6px;
          }
        }
      `}</style>

      <div className="expenses-heading">
        <div>
          <h2>Expenses</h2>
          <p>Track and manage your shared expenses.</p>
        </div>

        <Link className="expenses-add-btn" to="/add-expense">
          <Plus size={16} />
          Add Expense
        </Link>
      </div>

      <div className="expenses-summary">
        <div>
          <div className="expenses-summary-label">
            Total Expenses
          </div>
          <div className="expenses-summary-value">
            {money(total)}
          </div>
        </div>

        <div className="expenses-summary-icon">
          <Wallet size={21} />
        </div>
      </div>

      <div className="expenses-tools">
        <div className="expenses-search">
          <Search size={17} />
          <input
            placeholder="Search expenses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          {[
            "All",
            "Food",
            "Travel",
            "Shopping",
            "Entertainment",
            "Bills",
            "Other"
          ].map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="expenses-list">
        <div className="expenses-list-header">
          <h3>All Transactions</h3>
          <p>{filtered.length} transactions found</p>
        </div>

        {filtered.length > 0 ? (
          filtered.map((e) => (
            <div className="expense-item" key={e.id}>
              <div className="expense-item-left">
                <div className="expense-emoji">
                  {e.emoji || "🧾"}
                </div>

                <div>
                  <div className="expense-title">{e.title}</div>
                  <div className="expense-meta">
                    {e.category} · Paid by {e.paidBy} · {e.group}
                  </div>
                  <div className="expense-date">{e.date}</div>
                </div>
              </div>

              <div className="expense-item-right">
                <span className="expense-amount">
                  {money(e.amount)}
                </span>

                <button
                  type="button"
                  className="expense-delete"
                  title="Delete expense"
                  onClick={() => deleteExpense(e.id)}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="expenses-empty">
            <div className="expenses-empty-icon">
              {search || filter !== "All" ? (
                <Search size={21} />
              ) : (
                <Receipt size={21} />
              )}
            </div>
            No expenses found.
          </div>
        )}
      </div>
    </div>
  );
}

export default Expenses;
