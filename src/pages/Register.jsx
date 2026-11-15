
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthLayout, Logo, Field } from "../components/AuthComponents";

function Register({ setUser }) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = (e) => {
    e.preventDefault();

    if (password.length < 6) {
      alert("Password must contain at least 6 characters.");
      return;
    }

    localStorage.setItem(
      "splitfairAccount",
      JSON.stringify({ name, email, password })
    );

    setUser({ name, email });
    navigate("/dashboard");
  };

  return (
    <AuthLayout>
      <div className="text-center mb-8">
        <Logo />

        <h2 className="text-2xl font-bold mt-6">
          Create your account
        </h2>

        <p className="muted mt-2">
          Start sharing expenses fairly.
        </p>
      </div>

      <form onSubmit={register} className="space-y-5">
        <Field label="Full name">
          <input
            className="field"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Field>

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
            placeholder="At least 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Field>

        <button className="primary w-full">
          Create account
        </button>
      </form>

      <p className="text-center text-sm muted mt-6">
        Already registered?{" "}
        <Link className="link" to="/login">
          Login
        </Link>
      </p>
    </AuthLayout>
  );
}

export default Register;
