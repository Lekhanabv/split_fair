
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function PageHeading({ title, subtitle }) {
  return (
    <div className="mb-7">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="muted mt-2">{subtitle}</p>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-2">
        {label}
      </label>
      {children}
    </div>
  );
}

function AddExpense({ groups, addExpense }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "Food",
    paidBy: "You",
    group: ""
  });

  const update = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = e => {
    e.preventDefault();

    if (Number(form.amount) <= 0) {
      return alert("Enter a valid amount.");
    }

    const emojis = {
      Food: "🍔",
      Travel: "🚕",
      Shopping: "🛒",
      Entertainment: "🎬",
      Bills: "💡",
      Other: "📦"
    };

    addExpense({
      ...form,
      amount: Number(form.amount),
      emoji: emojis[form.category],
      group: form.group || "Personal"
    });

    navigate("/expenses");
  };

  return (
    <>
      <PageHeading
        title="Add Expense"
        subtitle="Record a new shared expense."
      />

      <form
        onSubmit={submit}
        className="panel p-6 max-w-2xl space-y-5"
      >
        <Field label="Expense name">
          <input
            className="field"
            name="title"
            value={form.title}
            onChange={update}
            placeholder="Example: Dinner"
            required
          />
        </Field>

        <Field label="Amount (₹)">
          <input
            className="field"
            type="number"
            min="0.01"
            step="0.01"
            name="amount"
            value={form.amount}
            onChange={update}
            placeholder="Enter amount"
            required
          />
        </Field>

        <Field label="Category">
          <select
            className="field"
            name="category"
            value={form.category}
            onChange={update}
          >
            {["Food", "Travel", "Shopping", "Entertainment", "Bills", "Other"]
              .map(x => <option key={x}>{x}</option>)}
          </select>
        </Field>

        <Field label="Paid by">
          <input
            className="field"
            name="paidBy"
            value={form.paidBy}
            onChange={update}
            required
          />
        </Field>

        <Field label="Group">
          <select
            className="field"
            name="group"
            value={form.group}
            onChange={update}
          >
            <option value="">Personal</option>

            {groups.map(g => (
              <option key={g.id} value={g.name}>
                {g.name}
              </option>
            ))}
          </select>
        </Field>

        <div className="flex gap-3">
          <button className="primary">
            Save Expense
          </button>

          <Link className="secondary" to="/expenses">
            Cancel
          </Link>
        </div>
      </form>
    </>
  );
}

export default AddExpense;
