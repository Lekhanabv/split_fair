
import React, { useEffect, useState } from "react";
import {
  BrowserRouter, Routes, Route, Navigate, Link,
  useNavigate, useLocation
} from "react-router-dom";

import {
  LayoutDashboard, Users, Receipt, ArrowLeftRight,
  TrendingUp, TrendingDown, History as HistoryIcon,
  ChartNoAxesCombined, Settings as SettingsIcon,
  Bell, LogOut, Wallet
} from "lucide-react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardPage from "./pages/Dashboard";
import GroupsPage from "./pages/Groups";
import ExpensesPage from "./pages/Expenses";
import AddExpensePage from "./pages/AddExpense";
import SplitExpensePage from "./pages/SplitExpense";
import BalancesPage from "./pages/Balances";
import SettlementsPage from "./pages/Settlements";
import HistoryPage from "./pages/History";
import AnalyticsPage from "./pages/Analytics";
import SettingsPage from "./pages/Settings";

const load = (key, fallback = []) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
};

const save = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const today = () =>
  new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });

const menu = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Groups", path: "/groups", icon: Users },
  { name: "Expenses", path: "/expenses", icon: Receipt },
  { name: "Split Expense", path: "/split-expense", icon: ArrowLeftRight },
  { name: "Balances", path: "/balances", icon: TrendingUp },
  { name: "Settlements", path: "/settlements", icon: TrendingDown },
  { name: "History", path: "/history", icon: HistoryIcon },
  { name: "Analytics", path: "/analytics", icon: ChartNoAxesCombined },
  { name: "Settings", path: "/settings", icon: SettingsIcon }
];

function App() {
  const [expenses, setExpenses] = useState(() => load("splitfairExpenses"));
  const [groups, setGroups] = useState(() => load("splitfairGroups"));
  const [settlements, setSettlements] = useState(() => load("splitfairSettlements"));
  const [activities, setActivities] = useState(() => load("splitfairActivities"));
  const [user, setUser] = useState(() => load("splitfairUser", null));

  useEffect(() => save("splitfairExpenses", expenses), [expenses]);
  useEffect(() => save("splitfairGroups", groups), [groups]);
  useEffect(() => save("splitfairSettlements", settlements), [settlements]);
  useEffect(() => save("splitfairActivities", activities), [activities]);

  useEffect(() => {
    if (user) {
      save("splitfairUser", user);
    } else {
      localStorage.removeItem("splitfairUser");
    }
  }, [user]);

  const addActivity = (title, detail) => {
    setActivities(prev => [{
      id: Date.now(),
      title,
      detail,
      date: today()
    }, ...prev]);
  };

  const addExpense = (expense) => {
    const item = {
      ...expense,
      id: Date.now(),
      amount: Number(expense.amount),
      date: today()
    };

    setExpenses(prev => [item, ...prev]);
    addActivity("Expense added", item.title);
  };

  const addGroup = (group) => {
    const item = {
      ...group,
      id: Date.now()
    };

    setGroups(prev => [item, ...prev]);
    addActivity("Group created", item.name);
  };

  const deleteExpense = (id) => {
    const item = expenses.find(e => e.id === id);

    setExpenses(prev => prev.filter(e => e.id !== id));

    if (item) {
      addActivity("Expense deleted", item.title);
    }
  };

  const deleteGroup = (id) => {
    const item = groups.find(g => g.id === id);

    setGroups(prev => prev.filter(g => g.id !== id));

    if (item) {
      addActivity("Group deleted", item.name);
    }
  };

  const addSettlement = (item) => {
    const settlement = {
      ...item,
      id: Date.now(),
      date: today()
    };

    setSettlements(prev => [settlement, ...prev]);
    addActivity("Settlement recorded", settlement.person);
  };

  const totalExpenses = expenses.reduce(
    (sum, e) => sum + Number(e.amount || 0),
    0
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Login setUser={setUser} />}
        />

        <Route
          path="/login"
          element={<Login setUser={setUser} />}
        />

        <Route
          path="/register"
          element={<Register setUser={setUser} />}
        />

        <Route
          path="/*"
          element={
            user ? (
              <MainLayout
                user={user}
                setUser={setUser}
                expenses={expenses}
                groups={groups}
                settlements={settlements}
                activities={activities}
                totalExpenses={totalExpenses}
                addExpense={addExpense}
                addGroup={addGroup}
                deleteExpense={deleteExpense}
                deleteGroup={deleteGroup}
                addSettlement={addSettlement}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

function MainLayout(props) {
  const location = useLocation();
  const navigate = useNavigate();

  const active =
    menu.find(item => item.path === location.pathname)?.name || "Dashboard";

  const logout = () => {
    props.setUser(null);
    navigate("/login");
  };

  return (
    <div className="min-h-screen app-bg md:flex">

      <aside className="sidebar">
        <Link to="/dashboard" className="flex items-center gap-3 mb-9 px-2">
          <div className="logo-icon">
            <Wallet size={21} />
          </div>

          <div>
            <p className="text-lg font-bold brand tracking-tight">
              SplitFair
            </p>
            <p className="text-xs muted">
              Shared fairly
            </p>
          </div>
        </Link>

        <p className="menu-label">WORKSPACE</p>

        <nav className="flex flex-row flex-wrap md:flex-col gap-1.5">
          {menu.map(item => {
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${
                  active === item.name ? "nav-active" : ""
                }`}
              >
                <Icon size={18} strokeWidth={1.8} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-6">
          <div className="soft-panel p-3 mb-4 hidden md:block">
            <p className="text-xs font-semibold brand">
              SPLITFAIR
            </p>
            <p className="text-xs muted mt-1">
              Manage shared expenses with ease.
            </p>
          </div>

          <button
            onClick={logout}
            className="nav-link w-full"
          >
            <LogOut size={18} strokeWidth={1.8} />
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">

        <header className="flex justify-between items-center mb-6 pb-5 border-b border-[#e9ecf5]">
          <div>
            <p className="muted text-xs font-medium">
              {today()}
            </p>

            <h1 className="text-lg font-bold mt-1 text-[#354761]">
              {active}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <div className="notification">
              <Bell size={17} />
            </div>

            <div className="avatar">
              <Wallet size={17} />
            </div>
          </div>
        </header>

        <Routes>
          <Route
            path="/dashboard"
            element={<DashboardPage {...props} />}
          />

          <Route
            path="/groups"
            element={<GroupsPage {...props} />}
          />

          <Route
            path="/expenses"
            element={<ExpensesPage {...props} />}
          />

          <Route
            path="/add-expense"
            element={<AddExpensePage {...props} />}
          />

          <Route
            path="/split-expense"
            element={<SplitExpensePage {...props} />}
          />

          <Route
            path="/balances"
            element={<BalancesPage {...props} />}
          />

          <Route
            path="/settlements"
            element={<SettlementsPage {...props} />}
          />

          <Route
            path="/history"
            element={<HistoryPage {...props} />}
          />

          <Route
            path="/analytics"
            element={<AnalyticsPage {...props} />}
          />

          <Route
            path="/settings"
            element={<SettingsPage {...props} />}
          />

          <Route
            path="*"
            element={<Navigate to="/dashboard" replace />}
          />
        </Routes>

      </main>
    </div>
  );
}

export default App;
