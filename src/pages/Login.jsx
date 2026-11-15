
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthLayout, Logo, Field } from "../components/AuthComponents";

function load(key, fallback = null) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function Login({ setUser }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      alert("Please enter your email and password.");
      return;
    }

    const account = load("splitfairAccount");

    if (
      account &&
      account.email === email &&
      account.password !== password
    ) {
      alert("Incorrect password.");
      return;
    }

    const name =
      account?.email === email
        ? account.name
        : email.split("@")[0];

    setUser({ name, email });
    navigate("/dashboard");
  };

  return (
    <AuthLayout>
      <div className="text-center mb-8">
        <Logo />
        <h2 className="text-2xl font-bold mt-6">
          Welcome back!
        </h2>
        <p className="muted mt-2">
          Sign in to manage your shared expenses.
        </p>
      </div>

      <form onSubmit={login} className="space-y-5">
        <Field label="Email address">
          <input
            className="field"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Field>

        <Field label="Password">
          <input
            className="field"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Field>

        <button className="primary w-full">
          Login
        </button>
      </form>

      <p className="text-center text-sm muted mt-6">
        Don't have an account?{" "}
        <Link className="link" to="/register">
          Create account
        </Link>
      </p>
    </AuthLayout>
  );
}

export default Login;
