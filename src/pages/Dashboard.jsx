
import React from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Wallet,
  Users,
  CheckCircle,
  Receipt,
  ArrowRight
} from "lucide-react";

const money = (value) =>
  "₹" + Number(value || 0).toLocaleString("en-IN");

function StatCard({ title, amount, icon: Icon, color = "blue", note }) {
  return (
    <div className="panel p-5">
      <div className="flex justify-between items-center">
        <p className="muted text-sm font-medium">{title}</p>
        <div className={`stat-icon ${color}`}>
          <Icon size={19} />
        </div>
      </div>
      <p className="text-xl font-bold mt-4">{amount}</p>
      <p className="muted text-xs mt-1">{note}</p>
    </div>
  );
}

function Empty({ text }) {
  return (
    <div className="empty-state">
      <div className="emoji-box mx-auto mb-3">📋</div>
      <p>{text}</p>
    </div>
  );
}

function Dashboard({ expenses, groups, settlements, totalExpenses }) {
  const recent = expenses.slice(0, 4);

  const settled = settlements.reduce(
    (sum, s) => sum + Number(s.amount || 0),
    0
  );

  return (
    <>
      <div className="welcome-panel mb-6">
        <div>
          <p className="text-xs font-semibold tracking-wider opacity-75">
            SPLITFAIR OVERVIEW
          </p>
          <h2 className="text-xl font-bold mt-2">
            Manage expenses, simply.
          </h2>
          <p className="text-sm mt-2 opacity-80">
            Keep shared spending organised and fair.
          </p>
        </div>

        <Link to="/add-expense" className="welcome-button">
          <Plus size={17} />
          Add Expense
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
        <StatCard
          title="Total Expenses"
          amount={money(totalExpenses)}
          icon={Wallet}
          note="Across all groups"
        />

        <StatCard
          title="Total Groups"
          amount={groups.length}
          icon={Users}
          color="purple"
          note="Your shared spaces"
        />

        <StatCard
          title="Settlements"
          amount={money(settled)}
          icon={CheckCircle}
          color="green"
          note="Recorded payments"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <section className="panel p-5">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="section-title">My Groups</h3>
              <p className="muted text-xs mt-1">Your shared spaces</p>
            </div>
            <Users size={19} className="brand" />
          </div>

          {groups.length ? (
            groups.slice(0, 4).map(g => (
              <div className="list-row" key={g.id}>
                <div className="flex items-center gap-3">
                  <span className="emoji-box">👥</span>
                  <div>
                    <p className="font-semibold text-sm">{g.name}</p>
                    <p className="muted text-xs">
                      {g.members.length} members
                    </p>
                  </div>
                </div>

                <span className="font-semibold text-sm">
                  {money(
                    expenses
                      .filter(e => e.group === g.name)
                      .reduce((s, e) => s + e.amount, 0)
                  )}
                </span>
              </div>
            ))
          ) : (
            <Empty text="No groups created yet." />
          )}

          <Link className="link flex items-center gap-2 mt-4 text-sm" to="/groups">
            View all groups <ArrowRight size={15} />
          </Link>
        </section>

        <section className="panel p-5">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="section-title">Recent Expenses</h3>
              <p className="muted text-xs mt-1">Latest transactions</p>
            </div>
            <Receipt size={19} className="brand" />
          </div>

          {recent.length ? (
            recent.map(e => (
              <div className="list-row" key={e.id}>
                <div className="flex items-center gap-3">
                  <span className="emoji-box">{e.emoji || "🧾"}</span>
                  <div>
                    <p className="font-semibold text-sm">{e.title}</p>
                    <p className="muted text-xs">
                      {e.category} · {e.date}
                    </p>
                  </div>
                </div>

                <span className="font-semibold text-sm">
                  {money(e.amount)}
                </span>
              </div>
            ))
          ) : (
            <Empty text="No expenses added yet." />
          )}

          <Link className="link flex items-center gap-2 mt-4 text-sm" to="/expenses">
            View all expenses <ArrowRight size={15} />
          </Link>
        </section>
      </div>
    </>
  );
}

export default Dashboard;
